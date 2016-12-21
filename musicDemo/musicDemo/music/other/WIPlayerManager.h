//
//  WIPlayerManager.h
//  Player2.01
//
//  Created by licy on 15/2/28.
//  Copyright (c) 2015年 lichunyang. All rights reserved.
//

#import "WIBasePlayerManager.h"
#import "MusicModel.h"
#import "MyMusicModel.h"


typedef enum {
    WINetSourceType,//网络
    WIAppleSourceType,//苹果设备
    WILocalSourceType,//本地
    WITFSourceType ,// tf卡
    
}WISourceType;//音源

#define PlayManager [WIPlayerManager sharedPlayerManager]

@interface WIPlayerManager : WIBasePlayerManager

+ (WIPlayerManager *)sharedPlayerManager;

@property (nonatomic) WISourceType sourceType;

- (NSString *)musicName;

- (void)setModelArray:(NSMutableArray *)modelArray index:(NSInteger)index;



@end














