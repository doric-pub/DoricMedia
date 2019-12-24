//
//  MediaSourceGroup.h
//  MediaPlayer
//
//  Created by Think on 2016/12/29.
//  Copyright © 2016年 Cell. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MediaSource.h"

@interface MediaSourceGroup : NSObject

- (instancetype) init;

- (void)addMediaSource:(MediaSource*)mediaSource;
- (void)insertMediaSource:(MediaSource*)mediaSource atIndex:(NSUInteger)index;
- (void)removeMediaSource:(MediaSource*)mediaSource;
- (void)removeMediaSourceAtIndex:(NSUInteger)index;
- (void)removeAllMediaSources;
- (NSUInteger)count;
- (MediaSource*)getMediaSourceAtIndex:(NSUInteger)index;

@end
