//
//  SSAudioPlayer.m
//  Cg_CloudMusic
//
//  Created by licy on 14/11/13.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import "SSAudioPlayer.h"
#import "STKDataSource.h"
#import "SampleQueueId.h"
#import "SSPlayerTool.h"

@interface SSAudioPlayer () {
    
    double _cacheValue;
    
    NSTimer *_progressUpdateTimer;
    
    BOOL _isLocal;//是否为本地音乐
    
    BOOL _isFirst;
    
    //当前的时间
    NSString * currentotalTime ;
}

@end

static SSAudioPlayer *manager = nil;

@implementation SSAudioPlayer

+ (SSAudioPlayer *)sharedNetPlay {
    if (manager == nil) {
        manager = [[SSAudioPlayer alloc] init];
    }
    return manager;
}

- (id)init {
    if (self = [super init]) {
        
        [SSPlayerTool setPlaySession];
    }
    return self;
}

#pragma mark - public methods

- (void)playWithCommonUrl:(id)url {
    
    _currentUrl = nil;
    _url = nil;
    
    if ([url isKindOfClass:[NSString class]]) {
        _currentUrl = (NSString *)url;
        
        NSURL *tempUrl = [NSURL URLWithString:_currentUrl];
        
//        //是本地音乐
        if ([SSPlayerTool isNull:tempUrl.scheme]) {
            tempUrl = [[NSURL alloc] initFileURLWithPath:_currentUrl];
            _isLocal = YES;
        } else {
            _isLocal = NO;
        }
        
        [self playWithUrl:tempUrl];
        
//        LXLog(@"tempUrl.scheme:%@",tempUrl.scheme);
//        LXLog(@"tempUrl.resourceSpecifier:%@",tempUrl.resourceSpecifier);
    } else {
        _isLocal = YES;
        [self playWithUrl:url];
    }
}   

- (void)playWithNetUrl:(NSString *)url {
    _currentUrl = url;
    
    NSURL *ur = [NSURL URLWithString:_currentUrl];
    [self playWithUrl:ur];
}

- (void)playWithPath:(NSString *)path {
    _currentUrl = path;
    
    //可用本地url
    NSURL *url = [NSURL fileURLWithPath:_currentUrl];
    [self playWithUrl:url];
    
}
- (void)playWithUrl:(NSURL *)url{
    _url = url;
    [self play];
}

//basic method
- (void)resume {
//    LXLog(@"resume");
    [_audioPlayer resume];
}

- (void)pause {
//    LXLog(@"pause");
    
    if ([self isPlaying]) {
        [_audioPlayer pause];
    }
}

- (void)stop {
    if (_audioPlayer) {
        [self setCGPlayerState:CGPlayerStateUninitialion];
        [_audioPlayer dispose];
        [self stopProgressTimer];
        _cacheValue = 0.0;
    }
}


- (void)play {
    
    [self stop];
    
    _isFirst = YES;
    
//    LXLog(@"音频地址:%@",_url.path);
    
    [self setCGPlayerState:CGPlayerStateReady];
    
    _audioPlayer = [[STKAudioPlayer alloc] initWithOptions:(STKAudioPlayerOptions){ .flushQueueOnSeek = YES, .enableVolumeMixer = NO, .equalizerBandFrequencies = {50, 100, 200, 400, 800, 1600, 2600, 16000} }];
	_audioPlayer.meteringEnabled = NO;
	_audioPlayer.volume = 1;
    _audioPlayer.equalizerEnabled = YES;
    _audioPlayer.delegate = self;
    
    if (self.meteringEnabled) {
        _audioPlayer.meteringEnabled = YES;
    } else {
        self.meteringEnabled = NO;
    }
    
    
    
//    NSString* path = [[NSBundle mainBundle] pathForResource:@"141018 自健曝被挖角到脱口秀经历 何弃疗再现毁三观表演" ofType:@"mp3"];
    
    STKDataSource* dataSource = [STKAudioPlayer dataSourceFromURL:_url];
    
	[_audioPlayer setDataSource:dataSource withQueueItemId:[[SampleQueueId alloc] initWithUrl:_url andCount:0]];
    
    [self createTimers:YES];
}

- (void)seekToTimeWithSliderValue:(float)value {
//    LXLog(@"seekTime:%f",value*_audioPlayer.duration);
    [_audioPlayer seekToTime:value*_audioPlayer.duration];
}   

- (BOOL)isPlaying {
    if (_audioPlayer.state == STKAudioPlayerStatePlaying) {
        return YES;
    }
    return NO;
}

- (BOOL)isBuffering {
    if (_audioPlayer.state == STKAudioPlayerStateBuffering) {
        return YES;
    }
    return NO;
}

- (BOOL)isLocal {
    return _isLocal;
}

#pragma mark - private methods
//grogress定时器
- (void)createTimers:(BOOL)create {
    if (create) {
        if (_audioPlayer) {
            [self stopProgressTimer];
            _progressUpdateTimer =
            [NSTimer
             scheduledTimerWithTimeInterval:0.1
             target:self
             selector:@selector(updateProgress:)
             userInfo:nil
             repeats:YES];
        }
    }
}

-(void)stopProgressTimer{
    if (_progressUpdateTimer) {
        [_progressUpdateTimer invalidate];
        _progressUpdateTimer = nil;
    }
}

#pragma mark 网络更改progress
- (void)updateProgress:(NSTimer *)updatedTimer {
    
    float progress = [_audioPlayer progress];
    float duration = [_audioPlayer duration];
    float cacheProgress = [_audioPlayer cacheProgress];
    CGFloat value = progress / duration;
    CGFloat cacheValue = cacheProgress / duration;
//    LXLog(@"%@",[NSThread currentThread]);
//    LXLog(@"progress = %f\n duration = %f\ncacheProgress = %F\nprogress / duration = %f\ncacheValue = %f",progress, duration,cacheProgress,value,cacheValue);
    
    
    float peakPower = 0.0;
    if (self.meteringEnabled) {
        peakPower = pow(10, (0.05 * [_audioPlayer averagePowerInDecibelsForChannel:0]));
//        LXLog(@"peakPower:%f",peakPower);
    }
    
    //缓存条  缓存有问题暂时置0
    cacheValue = 0;
//    if ([self isLocal]) {
//        cacheValue = 0;
//    } else {
//        if (duration <= 0) {
//            cacheValue = 0;
//        } else if (_cacheValue > 0) {
//            cacheValue = _cacheValue;
//        } else if (cacheValue > 0.99 && cacheValue != 1) {
//            _cacheValue = 1.0;
//        }
//    }
    
    NSString *currentTime = [self currentTime];
    NSString *totalTime = [self totalTime];
    if (![totalTime isEqualToString:currentotalTime] ) {
//        DDLogVerbose((@"音乐播放的总时间不一样");
    }
    currentotalTime = currentTime;
    
//    LXLog(@"cacheValue:%f value:%f currentTime:%@ totoalTime:%@",cacheValue,value,currentTime,totalTime);
    
    
    //第一次播放
    if (_isFirst) {
        if (duration > 10) {
            if (_startPlay) {
                _startPlay(totalTime);
            }
            _isFirst = NO;
        }
    }
    
    if (duration > 0.0) {
        
        if (_progressTimer) {
            
            if (duration < 10) {
                value = 0.0;
            }
            _progressTimer(currentTime,totalTime,value,cacheValue);
        }
        
        if (self.meteringEnabled) {
            if (_peakPower) {
                _peakPower(peakPower);
            }
        }
    }
}

- (NSString *)currentTime {
    int seconds = (int)[_audioPlayer progress] % 60;
    int minutes = ((int)[_audioPlayer progress]/60) % 60;
    //    int hours = (int)[_audioPlayer progress] / 3600;
    
    return [NSString stringWithFormat:@"%02d:%02d", minutes, seconds];
}

- (NSString *)totalTime {
    int seconds = (int)[_audioPlayer duration] % 60;
    int minutes = ((int)[_audioPlayer duration]/60) % 60;
    //    int hours = (int)[_audioPlayer duration] / 3600;
    
    return [NSString stringWithFormat:@"%02d:%02d", minutes, seconds];
}

//播放状态改变
-(void) STKAudioPlayerStateChange {
    
//    LXLog(@"_audioPlayer.state:%d",_audioPlayer.state);
    
    if (_audioPlayer.state == STKAudioPlayerStatePaused)
    {
        [self setCGPlayerState:CGPlayerStatePause];
    }
    else if (_audioPlayer.state == STKAudioPlayerStatePlaying)
    {
        [self setCGPlayerState:CGPlayerStatePlaying];
    }
    else if (_audioPlayer.state == STKAudioPlayerStateStopped)
    {
        [self setCGPlayerState:CGPlayerStateStop];
    }
    else if (_audioPlayer.state == STKAudioPlayerStateBuffering)
    {
        [self setCGPlayerState:CGPlayerStateBuffering];
    }
    else if (_audioPlayer.state == STKAudioPlayerStateError)
    {
        [self setCGPlayerState:CGPlayerStateError];
    }
    else if (_audioPlayer.state == STKAudioPlayerStateReady) {
        [self setCGPlayerState:CGPlayerStateReady];
    }
}

//设置音乐播放状态
- (void)setCGPlayerState:(CGPlayerState)cgPlayerState {
    
    if (_state == cgPlayerState) {
        return;
    }
    
    _state = cgPlayerState;
    
    if (_statusUpdate) {
        _statusUpdate(_state);
    }
}

#pragma mark - STKAudioPlayerDelegate
//状态改变
-(void) audioPlayer:(STKAudioPlayer*)audioPlayer stateChanged:(STKAudioPlayerState)state previousState:(STKAudioPlayerState)previousState {
    
	[self STKAudioPlayerStateChange];
}

//播放完成
-(void) audioPlayer:(STKAudioPlayer*)audioPlayer didFinishPlayingQueueItemId:(NSObject*)queueItemId withReason:(STKAudioPlayerStopReason)stopReason andProgress:(double)progress andDuration:(double)duration {
    SampleQueueId* queueId = (SampleQueueId*)queueItemId;
//    LXLog(@"Finished: %@", [queueId.url description]);
    
    [self STKAudioPlayerStateChange];
    if (_endPlay) {
        _endPlay();
    }
}

-(void) audioPlayer:(STKAudioPlayer*)audioPlayer unexpectedError:(STKAudioPlayerErrorCode)errorCode {
    
}

-(void) audioPlayer:(STKAudioPlayer*)audioPlayer didStartPlayingQueueItemId:(NSObject*)queueItemId {
    
	SampleQueueId* queueId = (SampleQueueId*)queueItemId;
//    LXLog(@"Started: %@", [queueId.url description]);
}

-(void) audioPlayer:(STKAudioPlayer*)audioPlayer didFinishBufferingSourceWithQueueItemId:(NSObject*)queueItemId {
    
}

-(void) audioPlayer:(STKAudioPlayer *)audioPlayer logInfo:(NSString *)line {
    
//    LXLog(@"%@", line);
}

@end
