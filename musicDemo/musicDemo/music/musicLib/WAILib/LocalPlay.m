//
//  LocalPlay.m
//  bluetoothRabbit_IOS
//
//  Created by licy on 14-8-1.
//  Copyright (c) 2014年 com.platomix. mBluetoothRabbit. All rights reserved.
//

#import "LocalPlay.h"

@interface LocalPlay () {
    AVAudioSession *_audioSession;
    BOOL _isFirst;
    
}

@property (nonatomic,strong) NSTimer *progressUpdateTimer;

@end

@implementation LocalPlay

- (id)init {
    if (self = [super init]) {
        [self setCategory];
    }
    return self;
}

- (void)setCategory {
    NSError *error;
    _audioSession = [AVAudioSession sharedInstance];
    [_audioSession setActive:YES error:nil];
    
    if (![_audioSession setCategory:AVAudioSessionCategoryPlayback error:&error]) {
//        LXLog(@"Error %@", [error localizedDescription]);
    }
}

- (NSData *)fileData {
//    LXLog(@"_audioPath:%@",_audioPath);
    NSError *readingError = nil;
    NSData *fileData = [NSData dataWithContentsOfFile:_audioPath options:NSDataReadingMapped
                                        error:&readingError];
//    LXLog(@"fileData:%u",fileData.length);
    return fileData;
}

- (void)playWithUrl:(id)url {
    
    _audioPath = nil;
    _url = nil;
    
    if ([url isKindOfClass:[NSString class]]) {
        _audioPath = (NSString *)url;
    } else {
        _url = (NSURL *)url;
    }
    
    [self play];
}


- (BOOL)play {
    
    [self stop];
    _isFirst = NO;
    
    self.state = CGPlayerStateReady;
    
    NSError *playbackError = nil;
    
    [self setCategory];
    
    NSURL *fileURL = nil;
//    if (self.url == nil) {
//        return NO ;
//    }
    if (self.url) {
//        LXLog(@"播放类型为NSUrl:%@",self.url);
        fileURL = self.url;
    } else {
//        LXLog(@"播放类型为NSString:%@",_audioPath);
        fileURL = [NSURL fileURLWithPath:_audioPath];
    }
//    LXLog(@"播放歌曲的url：%@",fileURL);
    self.audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:fileURL error:&playbackError];
    self.audioPlayer.volume = 1;
    if (self.meteringEnabled) {
        self.audioPlayer.meteringEnabled = YES;
    } else {
        self.audioPlayer.meteringEnabled = NO;
    }
    
    if (self.audioPlayer != nil){
        self.audioPlayer.delegate = self;
        if ([self.audioPlayer prepareToPlay] && [self.audioPlayer play]){
//            LXLog(@"Started playing the audio.");
            [self musicStartPlay];
            return YES;
        } else {
//           LXLog(@"Could not play the audio.");
            self.state = CGPlayerStateError;
            return NO;
        }
    } else {
//        LXLog(@"Failed to create an audio player.");
//        LXLog(@"%@",playbackError);
        self.state = CGPlayerStateError;
        return NO;
    }
}

#pragma mark  音频播放被打断（电话）
- (void)audioPlayerBeginInterruption:(AVAudioPlayer *)player {
//    LXLog(@"begin");
    if (_interruptAudio) {
        _interruptAudio();
    }
}

- (void)audioPlayerEndInterruption:(AVAudioPlayer *)player withOptions:(NSUInteger)flags {
//    LXLog(@"end");
    if (_interruptEndAudio) {
        _interruptEndAudio();
    }
}   

- (void)pause {
    if (self.audioPlayer.isPlaying) {
        [self.audioPlayer pause];
        self.state = CGPlayerStatePause;
    }
}
- (void)resume {
    [self.audioPlayer play];
    self.state = CGPlayerStatePlaying;
}
- (void)seekToTimeWithSliderValue:(float)value {
    self.audioPlayer.currentTime = value*self.audioPlayer.duration;
}

- (void)stop {
    
    [self.audioPlayer stop];
    self.state = CGPlayerStateUninitialion;
    [self createLocalTimers:NO];
}   

- (BOOL)isPlaying {
    return _audioPlayer.isPlaying;
}

- (NSTimeInterval)currentTime {
    return _audioPlayer.currentTime;
}

- (NSTimeInterval)totalTime {
    return _audioPlayer.duration;
}


- (void)setState:(CGPlayerState)state {
    
    if (_state == state) {
        return;
    }
    
    _state = state;
    
    if (_statusUpdate) {
        _statusUpdate(state);
    }
    
}

//音乐开始播放时做些处理(子类使用) 父类不做处理
- (void)musicStartPlay {
    _isFirst = NO;
    [self createLocalTimers:YES];
}

#pragma mark  grogress
- (void)createLocalTimers:(BOOL)create {
    if (create) {
        [self stopLocalTimer];
        _progressUpdateTimer =
        [NSTimer
         scheduledTimerWithTimeInterval:0.1
         target:self
         selector:@selector(updateLocalProgress:)
         userInfo:nil
         repeats:YES];
        
    } else {
        [self stopLocalTimer];
    }
}

-(void)stopLocalTimer{
    if (_progressUpdateTimer) {
        [_progressUpdateTimer invalidate];
        _progressUpdateTimer = nil;
    }
}

#pragma mark 更改progress
- (void)updateLocalProgress:(NSTimer *)updatedTimer {
    
    NSString *currentTime = [self currentStrTime];
    NSString *totalTime = [self totalStrTime];
    float progressValue = self.audioPlayer.currentTime / self.audioPlayer.duration;
    
//    LXLog(@"currentTime:%@ totalTime:%@ progressValue:%f",currentTime,totalTime,progressValue);
    
    //第一次播放
    if (_startPlay && !_isFirst) {
        self.state = CGPlayerStatePlaying;
        _startPlay(totalTime);
        _isFirst = YES;
    }
    
    if (self.meteringEnabled) {
        
        [self.audioPlayer updateMeters];
        
        float peakPower = pow(10, (0.05 * [self.audioPlayer averagePowerForChannel:0]));
        
        if (_peakPower) {
            _peakPower(peakPower);
        }
        
//        LXLog(@"peakPower:%f",peakPower);
    }

    if (_progressTimer) {
        _progressTimer(currentTime,totalTime,progressValue,0);
    }
    
    
}

- (NSString *)currentStrTime {
    int seconds = (int)[self.audioPlayer currentTime] % 60;
    int minutes = ((int)[self.audioPlayer currentTime]/60) % 60;
    //    int hours = (int)[self.audioPlayer progress] / 3600;
    
//    LXLog(@"[self.audioPlayer duration]:%f",[self.audioPlayer duration]);
//    LXLog(@"seconds:%02d minutes:%02d",seconds,minutes);
    
    return [NSString stringWithFormat:@"%02d:%02d", minutes, seconds];
}

- (NSString *)totalStrTime {
    int seconds = (int)[self.audioPlayer duration] % 60;
    int minutes = ((int)[self.audioPlayer duration]/60) % 60;
    //    int hours = (int)[_audioPlayer duration] / 3600;
    
    return [NSString stringWithFormat:@"%02d:%02d", minutes, seconds];
}   

#pragma mark --------------------------(播放结束)AVAudioPlayerDelegate------------------------
- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag{
    if (flag){
//        LXLog(@"Audio player stopped correctly.");
        if (self.playEnd) {
            self.playEnd();
        }
    } else {
//        LXLog(@"Audio player did not stop correctly.");
    }
    if ([player isEqual:self.audioPlayer]){
        self.audioPlayer = nil;
    } else {
        /* This is not the player */
    }
}

@end














