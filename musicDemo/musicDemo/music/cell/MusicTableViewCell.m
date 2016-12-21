//
//  MusicTableViewCell.m
//  musicDemo
//
//  Created by wgz on 2016/12/20.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import "MusicTableViewCell.h"

#define kScreenWidth [UIScreen mainScreen].applicationFrame.size.width
@implementation MusicTableViewCell

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self)
    {
        [self addLabel];
    }
    return self;
}

-(void) addLabel
{
    self.musicNameLabel = [[UILabel alloc] initWithFrame:CGRectMake(10, 10, kScreenWidth, 50)];
    [self.musicNameLabel setTextColor:[UIColor blackColor]];
    self.musicNameLabel.text = @"123";
    [self addSubview:self.musicNameLabel];
}

-(void)setMusicName:(NSString *)musicName
{
    NSArray *array = [musicName componentsSeparatedByString:@"/"];
    self.musicNameLabel.text = array[array.count-1];
}

@end
