//
//  MusicTableViewCell.h
//  musicDemo
//
//  Created by wgz on 2016/12/20.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MusicModel.h"

@interface MusicTableViewCell : UITableViewCell

@property (nonatomic,strong) UILabel * musicNameLabel;
@property(nonatomic,copy)NSString* musicName;

-(void) addLabel;
@end
