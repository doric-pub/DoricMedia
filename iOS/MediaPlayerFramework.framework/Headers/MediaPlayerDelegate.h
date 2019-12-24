//
//  MediaPlayerDelegate.h
//  MediaPlayer
//
//  Created by Think on 2017/8/16.
//  Copyright © 2017年 Cell. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol MediaPlayerDelegate <NSObject>
@required
- (void)onPrepared;
- (void)onErrorWithErrorType:(int)errorType;
- (void)onInfoWithInfoType:(int)infoType InfoValue:(int)infoValue;
- (void)onCompletion;
- (void)onVideoSizeChangedWithVideoWidth:(int)width VideoHeight:(int)height;
- (void)onBufferingUpdateWithPercent:(int)percent;
- (void)onSeekComplete;
@optional
@end

@protocol MediaPlayerIODelegate <NSObject>
@required
- (void)readMediaData:(uint8_t*)data Size:(int)size;
- (void)seekMediaData:(int64_t)offset From:(int)whence;
@optional
@end
