//
//  YPPVideoView.h
//  MediaPlayer
//
//  Created by Think on 2017/8/18.
//  Copyright © 2017年 Cell. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MediaPlayerCommon.h"
#import "MediaSourceGroup.h"
#import "MediaPlayerDelegate.h"
//#import "MediaPlayerProtocol.h"

@interface YPPVideoView : UIView

- (instancetype) init;
- (instancetype)initWithFrame:(CGRect)frame;

- (void)initialize;
- (void)initializeWithOptions:(MediaPlayerOptions*)options;

- (void)setMultiDataSourceWithMediaSourceGroup:(MediaSourceGroup*)mediaSourceGroup DataSourceType:(int)type;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs BufferingEndTimeMs:(int)bufferingEndTimeMs;
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type HeaderInfo:(NSMutableDictionary*)headerInfo; //@"Referer"
- (void)setDataSourceWithUrl:(NSString*)url DataSourceType:(int)type DataCacheTimeMs:(int)dataCacheTimeMs HeaderInfo:(NSMutableDictionary*)headerInfo; //@"Referer"
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
- (void)setVideoOpaque:(BOOL)isOpaque;
- (void)setVideoMaskMode:(int)videoMaskMode;
- (void)setPlayRate:(NSTimeInterval)playrate;
- (void)setLooping:(BOOL)isLooping;
- (void)setVariablePlayRateOn:(BOOL)on;

- (void)setAudioUserDefinedEffect:(int)effect;
- (void)setAudioEqualizerStyle:(int)style;
- (void)setAudioReverbStyle:(int)style;
- (void)setAudioPitchSemiTones:(int)value; //-12~+12

- (void)enableVAD:(BOOL)isEnable;

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

- (UIImage *)grabCurrentDisplayShot;

- (void)preLoadDataSourceWithUrl:(NSString*)url;
- (void)preLoadDataSourceWithUrl:(NSString*)url WithStartTime:(NSTimeInterval)startTime;

- (void)preSeekFrom:(NSTimeInterval)from To:(NSTimeInterval)to;
- (void)seamlessSwitchStreamWithUrl:(NSString*)url;

- (void)terminate;

+ (void)setScreenOn:(BOOL)on;

@property (nonatomic, weak) id<MediaPlayerDelegate> delegate;

@property (nonatomic, readonly) NSTimeInterval duration;
@property (nonatomic, readonly) NSTimeInterval currentPlaybackTime;
@property (nonatomic, readonly) CGSize videoSize;
@property (nonatomic, readonly) long long downLoadSize;
@property (nonatomic, readonly) int currentDB;

@end
