//
//  WAIRemoteLXBaseViewController.m
//  Cg_CloudMusic
//
//  Created by licy on 15/4/9.
//  Copyright (c) 2015年 licy. All rights reserved.
//

#import "WAIRemoteBaseViewController.h"
//#import "WIPlayerManager.h"
#import "LXPlayerViewController.h"
@implementation WAIRemoteLXBaseViewController

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
    [self becomeFirstResponder];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    [self resignFirstResponder];
    [[UIApplication sharedApplication] endReceivingRemoteControlEvents];
}
- (void)viewDidLoad
{
    [super viewDidLoad];

}
#pragma mark - 远程控制
- (void)remoteControlReceivedWithEvent:(UIEvent *)event {
    
//    if ([LXPlayerViewController sharedCMPlayerManager].isWebView) {
//        return;
//    }
    
    if (event.type == UIEventTypeRemoteControl) {
        switch (event.subtype) {
                //后台暂停
            case UIEventSubtypeRemoteControlPause:
                [self remotePause];
                break;
                //后台播放
            case UIEventSubtypeRemoteControlPlay:
                [self remotePlay];
                break;
                //线控播放或暂停
            case UIEventSubtypeRemoteControlTogglePlayPause:
                [self remotePause];
                break;
                //上一首
            case UIEventSubtypeRemoteControlPreviousTrack:
                [self remotePre];
                break;
                //下一首
            case UIEventSubtypeRemoteControlNextTrack:
                [self remoteNext];
                [self configNowPlayingInfoCenter];
                break;
                
            default:
                break;
        }
    }
}

- (void)remotePlay {
//    LXPlayerViewController *cm = [LXPlayerViewController sharedCMPlayerManager];
//    [cm resume];
}

//后台页面显示
- (void)configNowPlayingInfoCenter {

}

- (void)remotePause {
//    LXPlayerViewController *cm = [LXPlayerViewController sharedCMPlayerManager];
//    [cm pauseAllMusic];
}

- (void)remotePre {
//    LXPlayerViewController *cm = [LXPlayerViewController sharedCMPlayerManager];
//    [cm playPreSong];
}

- (void)remoteNext {
//    LXPlayerViewController *cm = [LXPlayerViewController sharedCMPlayerManager];
//    [cm playNextSong];
    
//    LXPlayerViewController *cm = [LXPlayerViewController sharedCMPlayerManager];
//    if (cm.playListArray.count == 0) {
//        [self.view makeToast:MyLocalizedString(@"tip_please_choose_the_music_to_play", nil) duration:2.0f position:@"top"];
//        return;
//    }else{
//        [[NSNotificationCenter defaultCenter]postNotificationName:cutTheSong object:@"next"];
////        if (cm.playModel == kXimalayaModel) {
////            
////        }else {
////             [PlayManager next];
////        }
//       [cm playNextSong];
    }
  

@end
