//
//  SSMusicTool.h
//  Tool
//
//  Created by licy on 14/12/5.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^HeadPhoneOut)(void);//耳机插吧
typedef void (^PhoneInterrupt)(void);//手机打断
typedef void (^VolumeChange)(float volume);//音量变化

#define SSMusic [SSMusicTool sharedTool]

@interface SSMusicTool : NSObject

//我的音乐模型数组
+ (NSMutableArray *)myMusicArray;

+ (SSMusicTool *)sharedTool;

// 让后台可以处理多媒体的事件
+ (void)beginReciving;

//后台播放
+ (void)setPlayBackCategory;

//后台无限运行
+ (void)addBackground;

//监听音量变化
- (void)listennerVolumeChange:(VolumeChange)volumeChange;

//监听来电
- (void)listennerPhoneWithPhoneInterrupt:(PhoneInterrupt)phoneInterrupt;

//监听耳机插拔
- (void)listennerHeadphoneWithHeadPhoneOut:(HeadPhoneOut)headPhoneOut;

@property (nonatomic,copy) HeadPhoneOut headPhoneOut;
@property (nonatomic,copy) PhoneInterrupt phoneInterrupt;
@property (nonatomic,copy) VolumeChange volumeChange;
@property (nonatomic) float volume;

@end
