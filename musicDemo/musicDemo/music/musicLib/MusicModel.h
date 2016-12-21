//
//  MusicModel.h
//  Player2.01
//
//  Created by licy on 15/3/7.
//  Copyright (c) 2015年 lichunyang. All rights reserved.
//

/*
 
 音乐相关父类模型,
 
 */

#import <Foundation/Foundation.h>

@interface MusicModel : NSObject

//歌曲名称
@property (nonatomic,copy) NSString *musicName;
//歌曲地址
@property (nonatomic,copy) NSString *musicPath;

//歌曲地址(手机中音乐只提供 NSURL)
@property (nonatomic,strong) NSURL *musicUrl;

@end
