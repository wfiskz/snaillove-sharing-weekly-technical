//
//  SSMusicTool.m
//  Tool
//
//  Created by licy on 14/12/5.
//  Copyright (c) 2014年 licy. All rights reserved.
//

/*
 
 AudioSessionInitialize 需要倒入<AudioToolbox/AudioToolbox.h>
 AVAudioSession 需要倒入<AVFoundation/AVFoundation.h>
 */

#import "SSMusicTool.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>
#import <MediaPlayer/MediaPlayer.h>
#import "MyMusicModel.h"

@implementation SSMusicTool

+ (NSMutableArray *)myMusicArray {
    NSMutableArray *arr = [NSMutableArray array];
    
    MPMediaQuery *myPlaylistsQuery = [MPMediaQuery songsQuery];
    NSArray *playlists = [myPlaylistsQuery collections];
    for (MPMediaPlaylist *playlist in playlists) {
        NSArray *array = [playlist items];
        for (MPMediaItem *song in array) {
            MyMusicModel * bean = [[MyMusicModel alloc] init];
            
            bean.url =  [song valueForProperty: MPMediaItemPropertyAssetURL];
            if (bean.url == nil) {
                continue;
            }
            
            MPMediaItemArtwork *artwork = [song valueForProperty: MPMediaItemPropertyArtwork];
            UIImage *artworkImages = [artwork imageWithSize:CGSizeMake(320, 265)];
            if (artworkImages) {
                bean.musicCover = (UIImage *)artworkImages;
            } else {
                bean.musicCover = [UIImage imageNamed: @"ic_album_cover_default.png"];
            }
            
            bean.musicName = [song valueForProperty: MPMediaItemPropertyTitle];
            
            NSURL* songURL = [song valueForProperty:MPMediaItemPropertyAssetURL];
            AVAsset* songAsset = [AVURLAsset URLAssetWithURL:songURL options:nil];
            NSString* lyrics = [songAsset lyrics];
            
            bean.Lyrics=lyrics;
            if(bean.Lyrics.length==0){
                bean.Lyrics=@"";
            }
            
            bean.AlbumTitle = [song valueForKey:MPMediaItemPropertyAlbumTitle];
            if(bean.AlbumTitle.length==0){
                bean.AlbumTitle=@"<unknown>";
            }
            bean.AlbumArtist=[song valueForKey:MPMediaItemPropertyAlbumArtist];
            if(bean.AlbumArtist.length==0){
                bean.AlbumArtist=@"<unknown>";
            }
            bean.singerName = [song valueForKey:MPMediaItemPropertyArtist];
            if(bean.singerName.length==0){
                bean.singerName=@"<unknown>";
            }
            //计算音乐文件所需要的时间
            CGFloat dblTotal=[[song valueForKey:MPMediaItemPropertyPlaybackDuration] floatValue];
            
            int seconds = (int)dblTotal;
            int minute = 0;
            if (seconds >= 60) {
                int index = seconds / 60;
                minute = index;
                seconds = seconds - index * 60;
            }
            bean.musicTime = [NSString stringWithFormat:@"%02d:%02d", minute, seconds];
            //            LXLog(@"bean:%@",bean);
            [bean setTotalTime:dblTotal];
            [arr addObject:bean];
            
        }
    }
    return arr;
}

+ (SSMusicTool *)sharedTool {
    static SSMusicTool *tool = nil;
    if (tool == nil) {
        tool = [[SSMusicTool alloc] init];
    }
    return tool;
}

+ (void)beginReciving {
    [[UIApplication sharedApplication] beginReceivingRemoteControlEvents]; 
}

+ (void)setPlayBackCategory {
    AVAudioSession *session = [AVAudioSession sharedInstance];
    [session setActive:YES error:nil];
    [session setCategory:AVAudioSessionCategoryPlayback error:nil];
}

+ (void)addBackground {
    /*
     需在plist中添加 Required background modes
     tiem0         App plays audio or streams audio/video using AirPlay
     */
    UIApplication*   app = [UIApplication sharedApplication];
    __block    UIBackgroundTaskIdentifier bgTask;
    bgTask = [app beginBackgroundTaskWithExpirationHandler:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if (bgTask != UIBackgroundTaskInvalid)
            {
                bgTask = UIBackgroundTaskInvalid;
            }
        });
    }];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if (bgTask != UIBackgroundTaskInvalid)
            {
                bgTask = UIBackgroundTaskInvalid;
            }
        });
    });
    [SSMusicTool setPlayBackCategory];
}

- (void)listennerVolumeChange:(VolumeChange)volumeChange {
    
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(volumeChanged:) name:@"AVSystemController_SystemVolumeDidChangeNotification" object:nil];
    
    self.volumeChange = volumeChange;
}   

-(void)volumeChanged:(NSNotification *)noti
{
    float volume =
    [[[noti userInfo]
      objectForKey:@"AVSystemController_AudioVolumeNotificationParameter"]
     floatValue];
    
    if (_volumeChange) {
        _volumeChange(volume);
    }
//    LXLog(@"volumn is %f", volume);
}

- (void)listennerPhoneWithPhoneInterrupt:(PhoneInterrupt)phoneInterrupt {
    [SSMusicTool setPlayBackCategory];
    self.phoneInterrupt = phoneInterrupt;
    AudioSessionInitialize(NULL, NULL, interruptionListenner, (__bridge void*)self);
}

void interruptionListenner(void* inClientData, UInt32 inInterruptionState)
{
    UIResponder *pTHIS = [UIApplication sharedApplication].delegate;
//    AppDelegate* pTHIS = (__bridge AppDelegate*)inClientData;
    if (pTHIS) {
//        LXLog(@"interruptionListenner %lu", inInterruptionState);
        if (kAudioSessionBeginInterruption == inInterruptionState) {
//            LXLog(@"Begin interruption");
            if (SSMusic.phoneInterrupt) {
                SSMusic.phoneInterrupt();
            }
        }
        else
        {
            
        }
    }
}

//捕获耳机插拔事件
void audioRouteChangeListenerCallback (
                                       void *inUserData,
                                       AudioSessionPropertyID inID,
                                       UInt32 inDataSize,
                                       const void *inData)
{
    UInt32 propertySize = sizeof(CFStringRef);
    AudioSessionInitialize(NULL, NULL, NULL, NULL);
    CFStringRef state = nil;
    AudioSessionGetProperty(kAudioSessionProperty_AudioRoute
                            ,&propertySize,&state);
    
//    LXLog(@"state:%@",state);
    if ([[NSString stringWithFormat:@"%@",state] isEqualToString:@"Speaker"]) {
        if (SSMusic.headPhoneOut) {
            SSMusic.headPhoneOut();
        }
    }
    //    LXLog(@"state:%@",state);
    //    LXLog(@"%@",(NSString *)(state);//return @"Headphone" or @"Speaker" and so on.
}

- (void)listennerHeadphoneWithHeadPhoneOut:(HeadPhoneOut)headPhoneOut {
    self.headPhoneOut = headPhoneOut;
    AudioSessionInitialize (NULL, NULL, NULL, NULL);
    OSStatus status = AudioSessionAddPropertyListener(
                                                      kAudioSessionProperty_AudioRouteChange,
                                                      audioRouteChangeListenerCallback,(__bridge void *)(self));
}

- (void)setVolume:(float)volume {
    [[MPMusicPlayerController applicationMusicPlayer] setVolume:volume];
}

- (float)volume {
    return [MPMusicPlayerController applicationMusicPlayer].volume;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
