//
//  PlayerDefine.h
//  Cg_CloudMusic
//
//  Created by licy on 14/12/2.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef play_music_noti 
    #define play_music_noti @"playMusicNoti"//列表
    #define station_music_noti @"stationMusicNoti"//站台
    #define recoder_music_noti @"recoderMusicNoti"//录音
    #define bluetooth_card_noti @"bluetooth_card"//蓝牙卡播放
#endif

#ifndef WEAKSELF_SS
    #define WEAKSELF_SS __weak __typeof(self)weakSelf = self;
#endif

typedef enum {
    CGPlayerStateUninitialion,
    CGPlayerStateReady,     //准备播放
    CGPlayerStatePlaying,   //正在播放
    CGPlayerStatePause,     //暂停
    CGPlayerStateStop,      //停止
    CGPlayerStateError,     //错误
    CGPlayerStateBuffering, //正在缓冲
}CGPlayerState;             //音乐播放状态

//开始播放的定时器
typedef void (^CGProgress)(NSString *currenttime,NSString *totalTime,float progressValue,float cacheProgressValue);
//播放状态改变
typedef void (^CGStatusUpdate)(CGPlayerState status);
//开始播放
typedef void (^CGStartPlay)(NSString *totalTime);
//结束播放
typedef void (^CGEndPlay)(void);
//频谱
typedef void (^CGPeakPower)(float peakPower);
//
typedef NSString * (^CGNet)(NSString * currentUrl);












