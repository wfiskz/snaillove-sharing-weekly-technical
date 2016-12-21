//
//  LXPlayerViewController.m
//  colorBluetoothLampV3
//
//  Created by lxz on 16/3/26.
//  Copyright © 2016年 TRP. All rights reserved.
//

#import "LXPlayerViewController.h"


typedef NS_ENUM(NSUInteger,LXPlayerModelType)
{
    LXPlayerModelTypeDefaut  = 0, //默认
    LXPlayerModelTypeList  =1, //列表播放
    LXPlayerModelTypeRandom  =2,// 随机播放
    LXPlayerModelTypeLoop = 3//单曲循环
};

@interface LXPlayerViewController ()
{
    UIButton *_btnDown; //下载按钮
    //中间旋转的圆盘
    UIImageView *_turntableView;
    UIButton * backButton;
}

@end

@implementation LXPlayerViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor colorWithWhite:1 alpha:0.4];
    backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(10, 30, 30, 30);
    [backButton setBackgroundImage:[UIImage imageNamed:@"btn_nav_back_nor"] forState:UIControlStateNormal];
    [backButton setBackgroundImage:[UIImage imageNamed:@"btn_nav_back_down"] forState:UIControlStateHighlighted];
    [backButton addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    backButton.tag = 1;
    [self.view addSubview:backButton];
    
    
    //5、网络音乐
    [[WIPlayerManager sharedPlayerManager] setModelArray:self.playListArray index:self.index];
    [[WIPlayerManager sharedPlayerManager] start];
}

//标题两边按钮事件
- (void)clickButton:(UIButton *)button
{
    if(button.tag == 1)
    {
        [self dismissModalViewControllerAnimated:YES];
    }else
    {
        
    }
    
}

-(void)downLoadClick:(UIButton*)btn{
    //下载
    
}

@end
