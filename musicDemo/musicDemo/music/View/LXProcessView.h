//
//  LXProcessView.h
//  LXProcessView
//
//  Created by PLATOMIX  on 15/12/19.
//  Copyright © 2015年 Vincent Wang. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIButton+EnlargeEdge.h"
#import "UIFont+ResizeFont.h"

@protocol LXProgressDelegate <NSObject>

-(void)processChanged:(float )process;

@end



@interface LXProcessView : UIView
@property(nonatomic,assign)id <LXProgressDelegate>delegate;
@property(nonatomic,strong)UILabel *durationlabel;
@property(nonatomic,strong)UIButton *thumButton;
@property(nonatomic,assign)float process;
@property(nonatomic,strong)UIImageView *minImage;
@property(nonatomic,strong)UIImageView *maxImage;
@property(nonatomic,strong)UILabel *musicDurationLabel;

-(void)setRunningTime:(NSString *)currentTime totaltime:(NSString *)total process:(float)process;
-(id)initWithFrame:(CGRect)frame
        thumbImage:(UIImage *)thumbImage
        miniTrackmumImage:(UIImage *)minimage
        maxmumTrackImage:(UIImage *)maxImage;

@end
