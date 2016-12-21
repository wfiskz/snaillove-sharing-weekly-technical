//
//  SSAudioPlayer.h
//  Cg_CloudMusic
//
//  Created by licy on 14/11/13.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "STKAudioPlayer.h"
#import "PlayerDefine.h"

@interface SSAudioPlayer : NSObject <STKAudioPlayerDelegate>

+ (SSAudioPlayer *)sharedNetPlay;

@property (nonatomic,copy) CGProgress progressTimer;
@property (nonatomic,copy) CGStatusUpdate statusUpdate;
@property (nonatomic,copy) CGStartPlay startPlay;
@property (nonatomic,copy) CGEndPlay endPlay;
@property (nonatomic,copy) CGPeakPower peakPower;

@property (nonatomic) CGPlayerState state;

//property
@property (nonatomic,strong) STKAudioPlayer *audioPlayer;

@property (nonatomic,copy) NSString *currentUrl;
@property (nonatomic, strong) NSURL *url;//播放地址

- (void)playWithNetUrl:(NSString *)urlString;
- (void)playWithPath:(NSString *)path;
- (void)playWithUrl:(NSURL *)url;

- (void)playWithCommonUrl:(id)url;

@property(getter=isMeteringEnabled) BOOL meteringEnabled;

//basic method
- (void)resume;
- (void)pause;
- (void)stop;

- (void)seekToTimeWithSliderValue:(float)value;//跳到某个时间

- (BOOL)isPlaying;
- (BOOL)isBuffering;
- (BOOL)isLocal;



@end
