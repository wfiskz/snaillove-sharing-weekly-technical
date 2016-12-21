//
//  CGPlayerEngine.h
//  Cg_CloudMusic
//
//  Created by licy on 14/12/2.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SSAudioPlayer.h"
#import "LocalPlay.h"
#import "PlayerDefine.h"

typedef enum {
    CG_ET_SSPlayer,//网络（第三方播放器）
    CG_ET_NSPlayer,//本地或设备（系统播放器）
    CG_ET_Bluetooth,
}CGEngineType;//区分不同播放器

typedef enum {
    CGCRList,//列表播放
    CGCRRandom,//随即播放
    CGCRSingle,//单曲循环
}CGCirculateRule;//循环模式

@interface CGPlayerEngine : NSObject

@property (nonatomic) CGCirculateRule circulateRule;//循环模式

@property (nonatomic) CGEngineType engineType;//音乐类型

@property (nonatomic) NSInteger playIndex;//第几首歌曲

//设置音乐地址列表和播放第几首歌曲
- (void)setPathArray:(NSMutableArray *)pathArray playIndex:(NSInteger)playIndex;

//block赋值
- (void)playWithProgress:(CGProgress)progress statusUpdate:(CGStatusUpdate)statusUpdate startPlay:(CGStartPlay)startPlay    playEnd:(CGEndPlay)playEnd peakPower:(CGPeakPower)peakPower;
- (void)localPathWithNetPath:(CGNet)cgNet;

- (void)startPlay;

//当前播放地址
- (id)currentUrl;

@property(getter=isMeteringEnabled) BOOL meteringEnabled;

- (void)pause;
- (void)stop;
- (void)resume;

- (void)prevMusic;
- (void)nextMusic;
- (void)autoNext;

- (BOOL)isPlaying;
- (BOOL)isLocal;
- (CGPlayerState)state;

- (NSTimeInterval)currentTime;
- (NSTimeInterval)totalTime;
- (void)seekToTimeWithSliderValue:(float)value;

//是否有播放列表
- (BOOL)isHaveMusicList;

//当前赋值的歌曲是否为正在播放的
- (BOOL)isCurrentUrlSameToPlayingUrl;

@end











