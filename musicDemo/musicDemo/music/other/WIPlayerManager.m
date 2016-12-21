//
//  WIPlayerManager.m
//  Player2.01
//
//  Created by licy on 15/2/28.
//  Copyright (c) 2015年 lichunyang. All rights reserved.
//

#import "WIPlayerManager.h"
#import <MediaPlayer/MediaPlayer.h>

@implementation WIPlayerManager

+ (WIPlayerManager *)sharedPlayerManager {
    static WIPlayerManager *manager = nil;
    if (manager == nil) {
        manager = [[WIPlayerManager alloc] init];
    }
    return manager;
}

- (void)setModelArray:(NSMutableArray *)modelArray index:(NSInteger)index {
    
    NSMutableArray *array = [NSMutableArray array];
        for (int i=0; i<modelArray.count; i++) {
            NSString *musicl = modelArray[i];
            [array addObject:musicl];
            
        }
    [super setModelArray:modelArray pathArray:array index:index];
    
}

- (NSString *)musicName {
    
    if (self.sourceType == WINetSourceType) {
        MusicModel *model = (MusicModel *)[super currentModel];
        return model.musicName;
    } else if (self.sourceType == WIAppleSourceType) {
        MyMusicModel *model = (MyMusicModel *)[super currentModel];
        return model.musicName;
    }
    
    return nil;
}


-(void)setSourceType:(WISourceType)sourceType{
    _sourceType = sourceType;
    
}

@end








