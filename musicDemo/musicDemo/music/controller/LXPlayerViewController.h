//
//  LXPlayerViewController.h
//  colorBluetoothLampV3
//
//  Created by lxz on 16/3/26.
//  Copyright © 2016年 TRP. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WIPlayerManager.h"

@interface LXPlayerViewController : UIViewController

@property (nonatomic,strong) STKAudioPlayer *audioPlayer;
@property (nonatomic,copy) NSString * str;
//歌曲列表
@property (nonatomic,strong) NSMutableArray *playListArray;

//歌曲列表
@property (nonatomic,assign) int index;

@end
