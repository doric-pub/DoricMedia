//
//  FishBubbleAudioPlayer.h
//  MediaPlayer
//
//  Created by Think on 2019/11/21.
//  Copyright © 2019 Cell. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol FishBubbleAudioPlayerDelegate <NSObject>
@required
- (void)onPrepared;
- (void)onErrorWithErrorType:(int)errorType;
- (void)onInfoWithInfoType:(int)infoType InfoValue:(int)infoValue;
- (void)onCompletion;
- (void)onSeekComplete;
@optional
@end

enum FISH_BUBBLE_AUDIO_PLAYER_TYPE
{
    FISH_BUBBLE_PRIVATE_AUDIO_PLAYER_TYPE = 0,
    FISH_BUBBLE_SYSTEM_AUDIO_PLAYER_TYPE = 1,
};

@interface FishBubbleAudioPlayerOptions : NSObject
@property (nonatomic) int audioPlayerType;
@property (nonatomic) BOOL isControlAudioSession;
@end

@interface FishBubbleAudioPlayer : NSObject

- (instancetype) init;

- (void)initialize:(FishBubbleAudioPlayerOptions*)options;
- (void)initialize;

- (void)setDataSource:(NSURL*)url;
- (void)setDataSourceWithUrl:(NSString*)url;

- (void)prepare;
- (void)prepareAsync;
- (void)prepareAsyncToPlay;
- (void)play;
- (BOOL)isPlaying;
- (void)pause;
- (void)stop;
- (void)seekTo:(NSTimeInterval)seekPosMs;

- (void)setVolume:(NSTimeInterval)volume;
- (void)setPlayRate:(NSTimeInterval)playrate;
- (void)setLooping:(BOOL)isLooping;

- (void)terminate;

@property (nonatomic, weak) id<FishBubbleAudioPlayerDelegate> delegate;

@property (nonatomic, readonly) NSTimeInterval durationMs;
@property (nonatomic, readonly) NSTimeInterval currentPlaybackTimeMs;
@property (nonatomic, readonly) NSInteger pcmDB; //40DB-80DB

@end

NS_ASSUME_NONNULL_END
