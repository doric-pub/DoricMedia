//
//  VideoView.h
//  MediaPlayer
//
//  Created by Think on 16/2/14.
//  Copyright © 2016年 Cell. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MediaPlayerCommon.h"
#import "MediaSourceGroup.h"

@protocol VideoViewDelegate <NSObject>
@required
- (void)didPrepare;
- (void)gotPlayerErrorWithErrorType:(int)errorType;
- (void)gotPlayerInfoWithInfoType:(int)infoType InfoValue:(int)infoValue;
- (void)gotComplete;
- (void)gotVideoSizeChangedWithVideoWidth:(int)width VideoHeight:(int)height;
- (void)gotBufferingUpdateWithPercent:(int)percent;
- (void)gotSeekComplete;
@optional
@end

@interface VideoView : UIView

- (void)initialize;
- (void)initializeWithOptions:(MediaPlayerOptions*)options;

- (void)setMultiDataSourceWithMediaSourceGroup:(MediaSourceGroup*)mediaSourceGroup DataSourceType:(int)type;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type;
- (void)prepareAsyncWithStartPos:(NSTimeInterval)startPosMs;
- (void)prepareAsync;
- (void)start;
- (void)pause;
- (void)stop:(BOOL)blackDisplay;
- (void)seekTo:(NSTimeInterval)seekPosMs;
- (void)seekToSource:(int)sourceIndex;
- (void)setVolume:(NSTimeInterval)volume;
- (void)setVideoScalingMode:(int)mode;
- (void)setVideoScaleRate:(float)scaleRate;
- (void)setFilterWithType:(int)type WithDir:(NSString*)filterDir;
- (void)setPlayRate:(NSTimeInterval)playrate;

//BACKWARD_FORWARD_RECORD_MODE
- (void)backWardForWardRecordStart;
- (void)backWardForWardRecordEndAsync:(NSString*)recordPath;

//BACKWARD_RECORD_MODE
- (void)backWardRecordAsync:(NSString*)recordPath;

- (void)terminate;

+ (void)setScreenOn:(BOOL)on;

@property (nonatomic, weak) id<VideoViewDelegate> delegate;

@property (nonatomic, readonly) NSTimeInterval duration;
@property (nonatomic, readonly) NSTimeInterval currentPlaybackTime;

@end
