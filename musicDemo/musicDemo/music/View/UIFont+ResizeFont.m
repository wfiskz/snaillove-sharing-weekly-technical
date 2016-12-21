//
//  UIFont+ResizeFont.m
//  colorBluetoothLampV3
//
//  Created by Vincent Wang on 2016/11/11.
//  Copyright © 2016年 TRP. All rights reserved.
//

#import "UIFont+ResizeFont.h"

@implementation UIFont (ResizeFont)

+(UIFont *)systemResizeFontOfSize:(CGFloat)fontSize
{
    CGFloat resizeFont = fontSize * (kScreenWidth/320.0);
     return [UIFont systemFontOfSize:resizeFont];
}

+(UIFont *)boldSystemResizeFontOfSize:(CGFloat)fontSize
{
    CGFloat resizeFont = fontSize * (kScreenWidth/320.0);
    return [UIFont boldSystemFontOfSize:resizeFont];
}

@end

