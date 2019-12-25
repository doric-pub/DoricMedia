/*
 * Copyright [2019] [Doric.Pub]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//
//  DoricVideoViewNode.m
//  DoricMedia
//
//  Created by jingpeng.wang on 2019/12/24.
//

#import "DoricVideoViewNode.h"

@interface DoricVideoViewNode() <MediaPlayerDelegate>

@end

@implementation DoricVideoViewNode

- (YPPVideoView *)build {
    return [[YPPVideoView alloc] init];
}

- (void)blendView:(YPPVideoView *)view forPropName:(NSString *)name propValue:(id)prop {
    if ([name isEqualToString:@"mediaPlayerOptions"]) {
        _mediaPlayerOptions = [[MediaPlayerOptions alloc] init];
        
        NSDictionary *dic = prop;
        _mediaPlayerOptions.media_player_mode = [(NSNumber *) dic[@"mediaPlayerMode"] intValue];
        _mediaPlayerOptions.pause_in_background = [(NSNumber *) dic[@"pauseInBackground"] intValue];
        _mediaPlayerOptions.video_decode_mode = [(NSNumber *) dic[@"videoDecodeMode"] intValue];
        _mediaPlayerOptions.record_mode = [(NSNumber *) dic[@"recordMode"] intValue];
        _mediaPlayerOptions.backupDir = [dic[@"backupDir"] stringValue];
        _mediaPlayerOptions.isAccurateSeek = [dic[@"isAccurateSeek"] boolValue];
        _mediaPlayerOptions.http_proxy = [dic[@"http_proxy"] stringValue];
        
        _mediaPlayerOptions.enableAsyncDNSResolver = [dic[@"enableAsyncDNSResolver"] boolValue];
        
        _mediaPlayerOptions.isVideoOpaque = [dic[@"isVideoOpaque"] boolValue];
        
        [view initializeWithOptions:_mediaPlayerOptions];
        view.delegate = self;
    } else if ([name isEqualToString:@"onPrepared"]) {
        _onPrepareFunction = prop;
    } else if ([name isEqualToString:@"onError"]) {
        _onErrorFunction = prop;
    } else if ([name isEqualToString:@"onInfo"]) {
        _onInfoFunction = prop;
    } else if ([name isEqualToString:@"onCompletion"]) {
        _onCompletionFunction = prop;
    } else if ([name isEqualToString:@"onVideoSizeChanged"]) {
        _onVideoSizeChangedFunction = prop;
    } else if ([name isEqualToString:@"onBufferingUpdate"]) {
        _onBufferingUpdateFunction = prop;
    } else if ([name isEqualToString:@"onSeekComplete"]) {
        _onSeekCompleteFunction = prop;
    } else {
        [super blendView:view forPropName:name propValue:prop];
    }
}

- (void)blend:(NSDictionary *)props {
    [super blend:props];
    [self.view.superview setNeedsLayout];
}

- (void)initialize {
    [self.view initialize];
}

- (void)setDataSource:(NSDictionary *)props {
    [self.view setDataSourceWithUrl:props[@"path"] DataSourceType:[(NSNumber *)props[@"type"] intValue]];
}

- (void)prepareAsync {
    [self.view prepareAsync];
}

- (void)prepareAsyncWithStartPos:(NSDictionary *)props {
    [self.view prepareAsyncWithStartPos:[(NSNumber *)props[@"startPosMs"] intValue]];
}

- (void)start {
    [self.view start];
}

- (void)pause {
    [self.view pause];
}

- (void)stop:(NSDictionary *)props {
    [self.view stop:[props[@"blackDisplay"] boolValue]];
}

- (void)seekTo:(NSDictionary *)props {
    [self.view seekTo:[(NSNumber *)props[@"msec"] intValue]];
}

- (void)grabDisplayShot:(NSDictionary *)props {
    [self.view grabDisplayShot:[props[@"shotPath"] stringValue]];
}

- (void)release:(NSDictionary *)props {
    [self.view terminate];
}

- (NSNumber *)getCurrentPosition {
    NSInteger time = self.view.currentPlaybackTime;
    return [NSNumber numberWithInteger: time];
}

- (NSNumber *)getDuration {
    NSInteger time = self.view.duration;
    return [NSNumber numberWithInteger: time];
}

- (void)setFilter:(NSDictionary *)props {
    [self.view setFilterWithType:[(NSNumber *)props[@"type"] intValue] WithDir:[props[@"filterDir"] stringValue]];
}

- (void)setVolume:(NSDictionary *)props {
    [self.view setVolume:[(NSNumber *)props[@"volume"] doubleValue]];
}

- (void)setPlayRate:(NSDictionary *)props {
    [self.view setPlayRate:[(NSNumber *)props[@"playrate"] doubleValue]];
}

- (void)setVideoScalingMode:(NSDictionary *)props {
    [self.view setVideoScalingMode:[(NSNumber *)props[@"mode"] intValue]];
}

- (void)setVideoScaleRate:(NSDictionary *)props {
    [self.view setVideoScaleRate:[(NSNumber *)props[@"scaleRate"] doubleValue]];
}

- (void)setVideoRotationMode:(NSDictionary *)props {
    [self.view setVideoRotationMode:[(NSNumber *)props[@"mode"] intValue]];
}

- (void)setLooping:(NSDictionary *)props {
    [self.view setLooping:[props[@"isLooping"] boolValue]];
}

- (void)onBufferingUpdateWithPercent:(int)percent {
    [self callJSResponse:_onBufferingUpdateFunction, @(percent), nil];
}

- (void)onCompletion {
    [self callJSResponse:_onCompletionFunction, nil];
}

- (void)onErrorWithErrorType:(int)errorType {
    [self callJSResponse:_onErrorFunction, @(errorType), nil];
}

- (void)onInfoWithInfoType:(int)infoType InfoValue:(int)infoValue {
    [self callJSResponse:_onInfoFunction, @(infoType), @(infoValue), nil];
}

- (void)onPrepared {
    [self callJSResponse:_onPrepareFunction, nil];
}

- (void)onSeekComplete {
    [self callJSResponse:_onSeekCompleteFunction, nil];
}

- (void)onVideoSizeChangedWithVideoWidth:(int)width VideoHeight:(int)height {
    [self callJSResponse:_onVideoSizeChangedFunction, @(width), @(height), nil];
}

@end
