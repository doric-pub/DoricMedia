//
//  MediaPlayerProtocol.h
//  MediaPlayer
//
//  Created by Think on 2017/8/16.
//  Copyright © 2017年 Cell. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#import "MediaPlayerCommon.h"
#import "MediaSourceGroup.h"
#import "MediaPlayerDelegate.h"

@protocol MediaPlayerProtocol <NSObject>

- (void)initialize;
- (void)initializeWithOptions:(MediaPlayerOptions*)options;

- (BOOL)setDisplay:(CALayer *)layer;
- (void)resizeDisplay;

- (void)setMultiDataSourceWithMediaSourceGroup:(MediaSourceGroup*)mediaSourceGroup DataSourceType:(int)type;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs BufferingEndTimeMs:(int)bufferingEndTimeMs;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs HeaderInfo:(NSMutableDictionary*)headerInfo;
- (void)prepare;
- (void)prepareAsyncWithStartPos:(NSTimeInterval)startPosMs;
- (void)prepareAsyncWithStartPos:(NSTimeInterval)startPosMs SeekMethod:(BOOL)isAccurateSeek;
- (void)prepareAsync;
- (void)prepareAsyncToPlay;
- (void)start;
- (BOOL)isPlaying;
- (void)pause;
- (void)stop:(BOOL)blackDisplay;
- (void)seekTo:(NSTimeInterval)seekPosMs;
- (void)seekTo:(NSTimeInterval)seekPosMs SeekMethod:(BOOL)isAccurateSeek;
- (void)seekToAsync:(NSTimeInterval)seekPosMs;
- (void)seekToAsync:(NSTimeInterval)seekPosMs SeekProperty:(BOOL)isForce;
- (void)seekToSource:(int)sourceIndex;
- (void)setVolume:(NSTimeInterval)volume;
- (void)setVideoScalingMode:(int)mode;
- (void)setVideoScaleRate:(float)scaleRate;
- (void)setVideoRotationMode:(int)mode;
- (void)setFilterWithType:(int)type WithDir:(NSString*)filterDir;
- (void)setVideoMaskMode:(int)videoMaskMode;
- (void)setPlayRate:(NSTimeInterval)playrate;
- (void)setLooping:(BOOL)isLooping;
- (void)setVariablePlayRateOn:(BOOL)on;

- (void)setAudioUserDefinedEffect:(int)effect;
- (void)setAudioEqualizerStyle:(int)style;
- (void)setAudioReverbStyle:(int)style;
- (void)setAudioPitchSemiTones:(int)value; //-12~+12

- (void)enableVAD:(BOOL)isEnable;

- (void)iOSAVAudioSessionInterruption:(BOOL)isInterrupting;
- (void)iOSVTBSessionInterruption;

//BACKWARD_FORWARD_RECORD_MODE
- (void)backWardForWardRecordStart;
- (void)backWardForWardRecordEndAsync:(NSString*)recordPath;

//BACKWARD_RECORD_MODE
- (void)backWardRecordAsync:(NSString*)recordPath;

//ACCURATE_RECORDER
- (void)accurateRecordStartWithDefaultOptions:(NSString*)publishUrl;
- (void)accurateRecordStart:(AccurateRecorderOptions*)options;
- (void)accurateRecordStop:(BOOL)isCancle;

- (void)grabDisplayShot:(NSString*)shotPath;

- (void)preLoadDataSourceWithUrl:(NSString*)url WithStartTime:(NSTimeInterval)startTime;

- (void)preSeekFrom:(NSTimeInterval)from To:(NSTimeInterval)to;
- (void)seamlessSwitchStreamWithUrl:(NSString*)url;

- (void)terminate;

@property (nonatomic, weak) id<MediaPlayerDelegate> delegate;

@property (nonatomic, readonly) NSTimeInterval duration;
@property (nonatomic, readonly) NSTimeInterval currentPlaybackTime;
@property (nonatomic, readonly) CGSize videoSize;
@property (nonatomic, readonly) long long downLoadSize;
@property (nonatomic, readonly) int currentDB;
@property (nonatomic, readonly) int mediaPlayerMode;
@end
