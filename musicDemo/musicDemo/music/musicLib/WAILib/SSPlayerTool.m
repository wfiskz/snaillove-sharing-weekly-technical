//
//  SSPlayerTool.m
//  SSPlayer
//
//  Created by licy on 14/11/17.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import "SSPlayerTool.h"

@implementation SSPlayerTool

//tool
+ (BOOL)isNull:(id)obj {
    if ([obj isKindOfClass:[NSNull class]] || !obj) {
        return YES;
    }
    
    if ([obj isKindOfClass:[NSString class]]) {
        if ([obj length] == 0) {
            return YES;
        }
    }
    return NO;
}

+ (void)setPlaySession {
    NSError* error;
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&error];
    [[AVAudioSession sharedInstance] setActive:YES error:&error];
    
    //        Float32 bufferLength = 0.1;
    //        AudioSessionSetProperty(kAudioSessionProperty_PreferredHardwareIOBufferDuration, sizeof(bufferLength), &bufferLength);
}

@end
