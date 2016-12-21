//
//  LXProcessView.m
//  LXProcessView
//
//  Created by PLATOMIX  on 15/12/19.
//  Copyright © 2015年 Vincent Wang. All rights reserved.
//

#import "LXProcessView.h"

@implementation LXProcessView

-(id)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame])
    {
        _thumButton = [UIButton buttonWithType:UIButtonTypeCustom];
        _thumButton.center = CGPointMake(30, self.bounds.size.height * 0.5);
        _thumButton.bounds = CGRectMake(0, 0, 40, self.bounds.size.height * 3);
        _thumButton.layer.cornerRadius = 7.0F;
        _thumButton.titleLabel.font = [UIFont systemResizeFontOfSize:11];
        _thumButton.backgroundColor = [UIColor redColor];
        _thumButton.titleLabel.textAlignment = NSTextAlignmentCenter;
        [_thumButton setEnlargeEdgeWithTop:30 right:20 bottom:30 left:20];
        [_thumButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handleGesture:)];
        [_thumButton addGestureRecognizer:pan];
        [self addSubview:_thumButton];
    }
    return self;
}

-(id)initWithFrame:(CGRect)frame thumbImage:(UIImage *)thumbImage miniTrackmumImage:(UIImage *)minimage maxmumTrackImage:(UIImage *)maxImage
{
    if (self = [super initWithFrame:frame]) {
        
        _minImage = [UIImageView new];
        _minImage.backgroundColor = [UIColor whiteColor];
        _minImage.image = minimage;
        _minImage.frame = CGRectMake(0, 0, (self.bounds.size.width ) * _process , 2);
        [self addSubview:_minImage];
        
        _maxImage = [UIImageView new];
        _maxImage.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.1];
        _maxImage.image = maxImage;
        _maxImage.frame = CGRectMake((self.bounds.size.width ) * _process , 0, self.bounds.size.width - _thumButton.center.x, 3);
        [self addSubview:_maxImage];
        
        _thumButton = [UIButton buttonWithType:UIButtonTypeCustom];
        _thumButton.center = CGPointMake(20, self.bounds.size.height * 0.5);
        _thumButton.bounds = CGRectMake(0, 0, 22, 22);
        _thumButton.layer.cornerRadius = self.bounds.size.height;
        _thumButton.titleLabel.font = [UIFont systemResizeFontOfSize:11];
        [_thumButton setImage:thumbImage forState:UIControlStateNormal];
        _thumButton.titleLabel.textAlignment = NSTextAlignmentCenter;
        [_thumButton setEnlargeEdgeWithTop:40 right:40 bottom:40 left:40];
        
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handleGesture:)];
        [_thumButton addGestureRecognizer:pan];
        [self addSubview:_thumButton];
        
        _musicDurationLabel = [[UILabel alloc] init];
        _musicDurationLabel.font = [UIFont systemResizeFontOfSize:11];
        _musicDurationLabel.text = @"04:01";
        _musicDurationLabel.bounds = CGRectMake(0, 0, 40, 15);
        
        float y = - self.frame.size.height * 0.5;
        float x = self.bounds.size.width -_musicDurationLabel.bounds.size.width/2;
        _musicDurationLabel.center = CGPointMake(x, y);
        _musicDurationLabel.textAlignment = NSTextAlignmentRight;
        _musicDurationLabel.textColor = [UIColor whiteColor];
    }
    return self;
}


-(void)setRunningTime:(NSString *)currentTime totaltime:(NSString *)total process:(float)process
{
    [_thumButton setTitle:currentTime forState:UIControlStateNormal];
    _durationlabel.text = total;
    _thumButton.center = CGPointMake( (self.bounds.size.width) * process, self.bounds.size.height * 0.5);
    _minImage.frame = CGRectMake(0, 0, (self.bounds.size.width ) * process , self.bounds.size.height);
    _maxImage.frame = CGRectMake((self.bounds.size.width ) * process , 0, self.bounds.size.width - _thumButton.center.x, self.bounds.size.height);
    _musicDurationLabel.text = total;
}


-(void)handleGesture:(UIPanGestureRecognizer *)recognizer
{
    CGPoint touthPoint = [recognizer locationInView:self];
    if (touthPoint.x >= .0f && touthPoint.x <= self.bounds.size.width ) {
        _thumButton.center = CGPointMake(touthPoint.x, self.bounds.size.height * 0.5);
        self.process = (touthPoint.x)/(self.bounds.size.width );
    }
}

-(void)setProcess:(float)process
{
    _process = process;
    _thumButton.center = CGPointMake((self.bounds.size.width) * process, self.bounds.size.height * 0.5);
    _minImage.frame = CGRectMake(0, (self.bounds.size.height -2)/2, (self.bounds.size.width ) * process, 2);
    _maxImage.frame = CGRectMake((self.bounds.size.width) * process ,(self.bounds.size.height -2)/2, self.bounds.size.width - _thumButton.center.x, 2);
    if ([_delegate respondsToSelector:@selector(processChanged:)]) {
        [_delegate processChanged:_process];
    }
}



@end
