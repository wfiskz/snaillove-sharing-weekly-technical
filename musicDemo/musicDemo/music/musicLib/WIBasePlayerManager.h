//
//  WIBasePlayerManager.h
//  Player2.01
//
//  Created by licy on 15/2/28.
//  Copyright (c) 2015年 lichunyang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CGPlayerEngine.h"
#import "PlayerDefine.h"
#import "SSMusicTool.h"

typedef enum {
    WIListCirculateModel,//列表播放
    WIRandomCirculateModel,//随即播放
    WISingleCirculateModel,//单曲循环
}WICirculateModel;//循环模式

@interface WIBasePlayerManager : NSObject

//---------------------------音频相关方法---------------------------

//添加无限后台功能
- (void)addPlayBackground;

//调节音量功能
@property (nonatomic) float volume;

//监听音量变化
- (void)listennerVolumeChange:(VolumeChange)volumeChange;

//允许刷新频谱
@property(getter=isMeteringEnabled) BOOL meteringEnabled;

//获取歌曲的频谱信息

//---------------------------初始化方法---------------------------

/*
 @brief 数据赋值
 @param modelArray 模型数组
 @param pathArray  音频地址数组
 @param index      第几首歌曲
 */
- (void)setModelArray:(NSMutableArray *)modelArray pathArray:(NSMutableArray *)pathArray index:(NSInteger)index;

/*
 @brief 回调赋值
 @param progress         播放进度
 @param statusUpdate     状态改变
 @param startPlay        开始播放
 @param playEnd          结束播放
 @param peakPower        频谱
 */
- (void)playWithProgress:(CGProgress)progress statusUpdate:(CGStatusUpdate)statusUpdate startPlay:(CGStartPlay)startPlay    playEnd:(CGEndPlay)playEnd peakPower:(CGPeakPower)peakPower;
- (void)localPathWithNetPath:(CGNet)cgNet;
//---------------------------逻辑相关方法---------------------------

//模型数组
@property (nonatomic,strong) NSMutableArray *modelArray;

//当前模型类
- (id)currentModel;

//苹果设备音乐
- (NSMutableArray *)myMusicArray;

//---------------------------播放器相关方法---------------------------

//第几首音乐
@property (nonatomic) NSInteger musicIndex;



//播放模式
@property (nonatomic) WICirculateModel circulateRule;

//播放
- (void)start;
//暂停
- (void)pause;
//继续
- (void)resume;
//停止
- (void)stop;

//上一曲
- (void)pre;
//下一曲
- (void)next;
//上一曲播放完成，跳转下一曲
- (void)autoNext;

//当前时间
- (NSTimeInterval)currentTime;
//总时间
- (NSTimeInterval)totalTime;
//跳转到某个位置
- (void)seekToTimeWithSliderValue:(float)value;

//音频是否正在播放
- (BOOL)isPlaying;
//音乐的播放状态
- (CGPlayerState)playerState;
//当前点击播放的歌曲是否为正在播放的
- (BOOL)isCurrentUrlSameToPlayingUrl;
//是否有播放列表
- (BOOL)isHaveMusicList;
//正在播放是否为本地
- (BOOL)isLocal;
























@end
