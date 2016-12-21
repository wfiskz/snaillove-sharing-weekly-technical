//
//  LocalPlay.h
//  bluetoothRabbit_IOS
//
//  Created by licy on 14-8-1.
//  Copyright (c) 2014年 com.platomix. mBluetoothRabbit. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "PlayerDefine.h"

typedef void(^InterruptAudio)(void);
typedef void(^InterruptEndAudio)(void);

@interface LocalPlay : NSObject <AVAudioPlayerDelegate>

@property (nonatomic,copy) InterruptAudio interruptAudio;//播放被打断的回调
@property (nonatomic,copy) InterruptEndAudio interruptEndAudio;//播放打断结束

@property (nonatomic,copy) CGEndPlay playEnd;//播放完成的回调
@property (nonatomic,copy) CGStartPlay startPlay;//开始播放的回调
@property (nonatomic,copy) CGProgress progressTimer;
@property (nonatomic,copy) CGStatusUpdate statusUpdate;
@property (nonatomic,copy) CGPeakPower peakPower;

@property (nonatomic) CGPlayerState state;

- (void)playWithUrl:(id)url;

@property (nonatomic, strong) AVAudioPlayer *audioPlayer;
@property (nonatomic, strong) NSString *audioPath;//播放地址
@property (nonatomic, strong) NSURL *url;//播放地址

@property(getter=isMeteringEnabled) BOOL meteringEnabled;

- (BOOL)play;//播放
- (void)pause;//暂停
- (void)resume;//继续
- (void)stop;//停止

- (BOOL)isPlaying;
- (NSTimeInterval)currentTime;
- (NSTimeInterval)totalTime;

- (void)seekToTimeWithSliderValue:(float)value;//跳到某个时间

@end







