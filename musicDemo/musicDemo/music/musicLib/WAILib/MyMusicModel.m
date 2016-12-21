//
//  MyMusicModel.m
//  Cg_CloudMusic
//
//  Created by licy on 14-10-3.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import "MyMusicModel.h"

@implementation MyMusicModel

- (NSString *)description {
    
    return [NSString stringWithFormat:@"歌曲名:%@ 歌曲地址:%@ 总时间:%@ 演唱者:%@",self.musicName,[self.url path],self.musicTime,self.singerName];
}

@end
