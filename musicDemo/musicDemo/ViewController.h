//
//  ViewController.h
//  musicDemo
//
//  Created by wgz on 2016/12/19.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "LXPlayerViewController.h"
#import "MusicTableViewCell.h"
#import "MusicModel.h"

@interface ViewController : UIViewController

@property (nonatomic,strong) LXPlayerViewController *player;
//歌曲列表
@property (nonatomic,strong) NSMutableArray *playListArray;
@end

