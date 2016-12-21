//
//  CGPlayerEngine.m
//  Cg_CloudMusic
//
//  Created by licy on 14/12/2.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import "CGPlayerEngine.h"
#import "SSPlayerTool.h"

@interface CGPlayerEngine ()

@property (nonatomic,strong) SSAudioPlayer *ssPlayer;//第三方播放器
@property (nonatomic,strong) LocalPlay *sysPlayer;//系统播放器

@property (nonatomic,strong) NSMutableArray *playList;//播放列表

@property (nonatomic,copy) CGNet cgNet;//播放列表

@end

@implementation CGPlayerEngine

#pragma mark 初始化方法

- (id)init {
    if (self = [super init]) {
        _sysPlayer = [[LocalPlay alloc] init];
        _ssPlayer = [[SSAudioPlayer alloc] init];
        _playList = [NSMutableArray array];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(bluetoothMusic:) name:bluetooth_card_noti object:nil];
    }
    return self;
}

//设置音乐地址列表和播放第几首歌曲
- (void)setPathArray:(NSMutableArray *)pathArray playIndex:(NSInteger)playIndex {
    
    self.playList = pathArray;
    if (pathArray.count == playIndex ) {
        playIndex = 0;
    }
    _playIndex = playIndex;
    
//    [self p_setEngineTypeWithUrl:[self p_currentUrl]];
}

//block赋值
- (void)playWithProgress:(CGProgress)progress statusUpdate:(CGStatusUpdate)statusUpdate startPlay:(CGStartPlay)startPlay    playEnd:(CGEndPlay)playEnd peakPower:(CGPeakPower)peakPower {
    
//    if (_engineType == CG_ET_NSPlayer) {
        _sysPlayer.progressTimer = progress;
        _sysPlayer.statusUpdate = statusUpdate;
        _sysPlayer.startPlay = startPlay;
        _sysPlayer.playEnd = playEnd;
        _sysPlayer.peakPower = peakPower;
//    } else if (_engineType == CG_ET_SSPlayer) {
        _ssPlayer.progressTimer = progress;
        _ssPlayer.statusUpdate = statusUpdate;
        _ssPlayer.startPlay = startPlay;
        _ssPlayer.endPlay = playEnd;
        _ssPlayer.peakPower = peakPower;
//    }
}

- (void)localPathWithNetPath:(CGNet)cgNet {
    _cgNet = cgNet;
}

#pragma mark 私有方法

//返回当前Url
- (NSURL *)p_currentUrl {
    
    NSURL *url = nil;
    id currentUrl = [self currentUrl];
    if ([currentUrl isKindOfClass:[NSString class]]) {
        url = [NSURL URLWithString:currentUrl];
        
        if ([SSPlayerTool isNull:url.scheme]) {
            url = [NSURL fileURLWithPath:[self currentUrl]];
        }
        
    } else {
        url = [self currentUrl];
    }
    
    return url;
}

- (NSURL *)p_currentPlayingUrl {
    
    if (self.engineType == CG_ET_NSPlayer) {
        
        if (![SSPlayerTool isNull:self.sysPlayer.audioPath]) {
            return [NSURL fileURLWithPath:self.sysPlayer.audioPath];
        } else if (![SSPlayerTool isNull:self.sysPlayer.url]) {
            return self.sysPlayer.url;
        } else {
            return nil;
        }
    } else if (self.engineType == CG_ET_SSPlayer) {
        
        if (![SSPlayerTool isNull:self.ssPlayer.currentUrl]) {
            return [NSURL URLWithString:self.ssPlayer.currentUrl];
        } else if (![SSPlayerTool isNull:self.ssPlayer.url]) {
            return self.ssPlayer.url;
        } else {
            return nil;
        }
    }
    return nil;
}

//返回url地址  并设置播放器类型
- (id)p_pathAndSetEngineTypeWithUrl:(NSURL *)url {
    
    /*
     
     scheme:http （网络
     scheme:(null) bundle路径
     scheme:ipod-library 苹果设备音乐
     scheme:file 沙盒路径
     
     */
    
    //本地路径（系统播放器）
    if ([SSPlayerTool isNull:url.scheme]) {
        
        self.engineType = CG_ET_NSPlayer;
        return [self currentUrl];
        
        //网络音乐(用第三方播放器)
    } else if ([url.scheme caseInsensitiveCompare:@"http"] == NSOrderedSame || [url.scheme caseInsensitiveCompare:@"https"] == NSOrderedSame) {
        

        if (_cgNet) {
            
            self.engineType = CG_ET_NSPlayer;
            return _cgNet([self currentUrl]);
            
        } else {
            self.engineType = CG_ET_SSPlayer;
            return [self currentUrl];
        }
        
        //本地音乐/苹果设备音乐
    } else {
        self.engineType = CG_ET_NSPlayer;
        return [self currentUrl];
    }
    
    return [self currentUrl];
}

#pragma mark 公共方法

- (void)startPlay {
    
    [self sendNotification];
    
    id tempUrl = [self p_pathAndSetEngineTypeWithUrl:[self p_currentUrl]];
    
    if (_engineType == CG_ET_NSPlayer) {
        [_ssPlayer stop];
        [_ssPlayer setUrl:nil];
        [_ssPlayer setCurrentUrl:nil];
        [_sysPlayer playWithUrl:tempUrl];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_sysPlayer stop];
        _sysPlayer.url = nil;
        _sysPlayer.audioPath = nil;
        [_ssPlayer playWithCommonUrl:tempUrl];
    }
}

- (id)currentUrl {
    if(_playList.count <= 0){
        return nil;
    }
    return _playList[_playIndex];
}   

- (void)playWithLocal:(id)url {
    _engineType = CG_ET_SSPlayer;
    [_sysPlayer pause];
    [_ssPlayer playWithCommonUrl:url];
}

- (void)setMeteringEnabled:(BOOL)meteringEnabled {
    if (_engineType == CG_ET_NSPlayer) {
        [_sysPlayer setMeteringEnabled:meteringEnabled];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_ssPlayer setMeteringEnabled:meteringEnabled];
    }
}

- (BOOL)isMeteringEnabled {
    if (_engineType == CG_ET_NSPlayer) {
        return _sysPlayer.meteringEnabled;
    }
    
    return _ssPlayer.meteringEnabled;
}

- (void)pause {
    [self sendNotification];
    
    if (_engineType == CG_ET_NSPlayer) {
        [_sysPlayer pause];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_ssPlayer pause];
    }   
}   

- (void)stop {
    if (_engineType == CG_ET_NSPlayer) {
        [_sysPlayer stop];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_ssPlayer stop];
    }
}

- (void)resume {
    
    [self sendNotification];
    
    if (_engineType == CG_ET_NSPlayer) {
        [_ssPlayer pause];
        [_sysPlayer resume];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_sysPlayer pause];
        [_ssPlayer resume];
    }
}   

- (BOOL)isPlaying {
    
    if (_engineType == CG_ET_NSPlayer) {
        return [_sysPlayer isPlaying];
    } else if (_engineType == CG_ET_SSPlayer) {
        return [_ssPlayer isPlaying];
    }
    return NO;
}

- (BOOL)isLocal {
    
    if (_engineType == CG_ET_NSPlayer) {
        return YES;
    }
    
    return NO;
}

- (CGPlayerState)state {
    
    if (_engineType == CG_ET_NSPlayer) {
        return _sysPlayer.state;
    } else if (_engineType == CG_ET_SSPlayer) {
        return _ssPlayer.state;
    }
    return CGPlayerStateReady;
    
}

- (NSTimeInterval)currentTime {
    
    if (_engineType == CG_ET_NSPlayer) {
        return [_sysPlayer currentTime];
    } else if (_engineType == CG_ET_SSPlayer) {
        return 0;
    }
    return 0;
}

- (NSTimeInterval)totalTime {
    
    if (_engineType == CG_ET_NSPlayer) {
        return [_sysPlayer totalTime];
    } else if (_engineType == CG_ET_SSPlayer) {
        return 0;
    }
    return 0;
}

- (void)seekToTimeWithSliderValue:(float)value {
    
    if (_engineType == CG_ET_NSPlayer) {
        [_sysPlayer seekToTimeWithSliderValue:value];
    } else if (_engineType == CG_ET_SSPlayer) {
        [_ssPlayer seekToTimeWithSliderValue:value];
    }
}

#pragma mark 上一首
- (void)prevMusic {
    _playIndex = (_playIndex == 0) ? (_playList.count - 1) : (_playIndex - 1);
}   

#pragma mark 下一首
- (void)nextMusic {
    _playIndex = (_playIndex == _playList.count - 1) ? 0 : (_playIndex + 1);
}   

#pragma mark  音乐下一首播放规则
- (void)autoNext {
    
    switch (self.circulateRule) {
//            LXLog(@"_circulateRule:%d",self.circulateRule);
        case CGCRList://列表播放
            _playIndex = (_playIndex == _playList.count - 1) ? 0 : (_playIndex + 1);
            
            break;
        case CGCRRandom://随机播放
            _playIndex = arc4random() % self.playList.count;
            
            break;
        case CGCRSingle://单曲播放
            ;
    }   
}

- (BOOL)isHaveMusicList {
    
    if (self.playList.count > 0) {
        return YES;
    }
    
    return NO;
}

- (BOOL)isCurrentUrlSameToPlayingUrl {
    
    NSURL *playingUrl = [self p_currentPlayingUrl];
    NSURL *currentUrl = [self p_currentUrl];
    
//    LXLog(@"playingUrl:%@ currentUrl:%@",playingUrl,currentUrl);
    
    if ([SSPlayerTool isNull:playingUrl]) {
        return NO;
    }
    
    return [playingUrl isEqual:currentUrl];
    
}

#pragma mark Notification

//发通知
- (void)sendNotification {
    [[NSNotificationCenter defaultCenter] postNotificationName:play_music_noti object:nil];
}   

- (void)bluetoothMusic:(NSNotification *)noti {
    _engineType = CG_ET_Bluetooth;
    [self pause];
}   

@end



















