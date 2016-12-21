//
//  WIBasePlayerManager.m
//  Player2.01
//
//  Created by licy on 15/2/28.
//  Copyright (c) 2015年 lichunyang. All rights reserved.
//

#import "WIBasePlayerManager.h"
#import "SSMusicTool.h"

@interface WIBasePlayerManager ()
    
    //播放引擎
    @property (nonatomic,strong) CGPlayerEngine *playerEngine;

    //循环模式
    @property (nonatomic) WICirculateModel circulateModel;

@end

@implementation WIBasePlayerManager


#pragma mark ---------------------------音乐相关方法---------------------------
- (void)addPlayBackground {
    [SSMusicTool addBackground];
}

- (void)listennerVolumeChange:(VolumeChange)volumeChange {
    [SSMusic listennerVolumeChange:volumeChange];
}

- (void)setVolume:(float)volume {
    SSMusic.volume = volume;
}

- (float)volume {
    return SSMusic.volume;
}

- (void)setMeteringEnabled:(BOOL)meteringEnabled {
    [self.playerEngine setMeteringEnabled:meteringEnabled];
}

- (BOOL)isMeteringEnabled {
    return [self.playerEngine isMeteringEnabled];
}

#pragma mark ---------------------------私有方法---------------------------

#pragma mark ---------------------------初始化方法---------------------------

- (id)init {
    if (self = [super init]) {
        self.playerEngine = [[CGPlayerEngine alloc] init];
        
        WEAKSELF_SS
        [SSMusic listennerHeadphoneWithHeadPhoneOut:^{
            [weakSelf pause];
//            [[NSNotificationCenter defaultCenter]postNotificationName:kHeadPhoneOut object:nil];
        }];
        
        [SSMusic listennerPhoneWithPhoneInterrupt:^{
            [weakSelf pause];
        }];
        
    }
    return self;
}

/*
 @brief 数据赋值
 @param modelArray 模型数组
 @param pathArray  音频地址数组
 @param index      第几首歌曲
 */
- (void)setModelArray:(NSMutableArray *)modelArray pathArray:(NSMutableArray *)pathArray index:(NSInteger)index {
    
    self.modelArray = modelArray;
    [self.playerEngine setPathArray:pathArray playIndex:index];
}

/*
 @brief 回调赋值
 @param progress         播放进度
 @param statusUpdate     状态改变
 @param startPlay        开始播放
 @param playEnd          结束播放
 @param peakPower        频谱
 */
- (void)playWithProgress:(CGProgress)progress statusUpdate:(CGStatusUpdate)statusUpdate startPlay:(CGStartPlay)startPlay    playEnd:(CGEndPlay)playEnd peakPower:(CGPeakPower)peakPower {
    [self.playerEngine playWithProgress:progress statusUpdate:statusUpdate startPlay:startPlay playEnd:playEnd peakPower:peakPower];
}

- (void)localPathWithNetPath:(CGNet)cgNet {
    [self.playerEngine localPathWithNetPath:cgNet];
}

#pragma mark ---------------------------播放器相关方法---------------------------

- (void)setMusicIndex:(NSInteger)musicIndex {
    self.playerEngine.playIndex = musicIndex;
}   

- (NSInteger)musicIndex {
    
    return self.playerEngine.playIndex;
}

//设置循环模式
- (void)setCirculateRule:(WICirculateModel)circulateModel {
    
    if (circulateModel == WIListCirculateModel) {
        self.playerEngine.circulateRule = CGCRList;
    } else if (circulateModel == WIRandomCirculateModel) {
        self.playerEngine.circulateRule = CGCRRandom;
    } else if (circulateModel == WISingleCirculateModel) {
        self.playerEngine.circulateRule = CGCRSingle;
    }
}

- (WICirculateModel)circulateRule {
    
    if (self.playerEngine.circulateRule == CGCRList) {
        return WIListCirculateModel;
    } else if (self.playerEngine.circulateRule == CGCRRandom) {
        return WIRandomCirculateModel;
    } else if (self.playerEngine.circulateRule == CGCRSingle) {
        return WISingleCirculateModel;
    }
    
    return 0;
}

- (void)start {
    
    [self.playerEngine startPlay];
}

- (void)pause {
    
    [self.playerEngine pause];
}

- (void)resume {
    
    [self.playerEngine resume];
}

- (void)stop {
    [self.playerEngine stop];
}

- (void)pre {
    
    [self.playerEngine prevMusic];
    [self.playerEngine startPlay];
}

- (void)next {
    
    [self.playerEngine nextMusic];
    [self.playerEngine startPlay];
}

- (void)autoNext {
    [self.playerEngine autoNext];
    [self.playerEngine startPlay];
}

//当前时间
- (NSTimeInterval)currentTime {
    return self.playerEngine.currentTime;
}
//总时间
- (NSTimeInterval)totalTime {
    return self.playerEngine.totalTime;
}
//跳转到某个位置
- (void)seekToTimeWithSliderValue:(float)value {
    [self.playerEngine seekToTimeWithSliderValue:value];
}

#pragma mark ---------------------------其他方法---------------------------

- (BOOL)isCurrentUrlSameToPlayingUrl {
    
    return [self.playerEngine isCurrentUrlSameToPlayingUrl];
}

- (id)currentModel {
    return self.modelArray[self.playerEngine.playIndex];
}

- (NSMutableArray *)myMusicArray {
    return [SSMusicTool myMusicArray];
}

- (CGPlayerState)playerState {
    return self.playerEngine.state;
}   

//是否有播放列表
- (BOOL)isHaveMusicList {
    
    return self.playerEngine.isHaveMusicList;
}

- (BOOL)isLocal {
    return self.playerEngine.isLocal;
}

- (BOOL)isPlaying {
    
    if ([self playerState] == CGPlayerStatePlaying) {
        return YES;
    }
    
    return NO;
}



@end









