//
//  MediaSource.h
//  MediaPlayer
//
//  Created by Think on 2016/12/29.
//  Copyright © 2016年 Cell. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MediaSource : NSObject
@property (nonatomic, strong) NSString *url;
@property (nonatomic) NSTimeInterval startPos;
@property (nonatomic) NSTimeInterval endPos;
@property (nonatomic) NSTimeInterval volume;
@property (nonatomic) NSTimeInterval speed;
@property (nonatomic) NSTimeInterval duration;
@end
