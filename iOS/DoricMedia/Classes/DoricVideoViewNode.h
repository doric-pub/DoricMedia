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
//  DoricVideoViewNode.h
//  DoricMedia
//
//  Created by jingpeng.wang on 2019/12/24.
//

#import "DoricViewNode.h"
#import <MediaPlayerFramework/YPPVideoView.h>
#import <MediaPlayerFramework/MediaPlayerCommon.h>

NS_ASSUME_NONNULL_BEGIN

@interface DoricVideoViewNode : DoricViewNode<YPPVideoView *>

@property(nonatomic, strong) MediaPlayerOptions *mediaPlayerOptions;
@property(nonatomic, weak)id<MediaPlayerDelegate> delegate;

@property(nonatomic, strong) NSString *onPrepare;
@property(nonatomic, strong) NSString *onError;
@property(nonatomic, strong) NSString *onInfo;
@property(nonatomic, strong) NSString *onCompletion;
@property(nonatomic, strong) NSString *onVideoSizeChanged;
@property(nonatomic, strong) NSString *onBufferingUpdate;
@property(nonatomic, strong) NSString *onSeekComplete;

@end

NS_ASSUME_NONNULL_END
