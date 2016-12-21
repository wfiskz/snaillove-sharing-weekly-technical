//
//  MyMusicModel.h
//  Cg_CloudMusic
//
//  Created by licy on 14-10-3.
//  Copyright (c) 2014年 licy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface MyMusicModel : NSObject {
    
}

@property (nonatomic) CGFloat totalTime;
@property(nonatomic,copy)NSString* musicName;   //歌曲名
@property(nonatomic,copy)NSString* musicTitle;   //标题
@property(nonatomic,copy)NSString* musicAlbum;   //专辑
@property(nonatomic,copy)NSString* musicArtist;   //歌手
@property(nonatomic,copy)NSString* musicGenre;   //风格
@property(nonatomic,copy)NSString* musicType;   //格式

@property(nonatomic,strong)NSURL* url;            //歌曲地址
@property(nonatomic,copy)NSString* singerName;  //演唱者
@property(nonatomic,copy)NSString* musicTime;   //总时间
@property(nonatomic,strong)UIImage* musicCover;   //封面
@property(nonatomic,copy)NSString* AlbumTitle;  //专辑名
@property(nonatomic,copy)NSString* AlbumArtist; //专辑歌手
@property(nonatomic,copy)NSString* Lyrics;      //歌词

@end
