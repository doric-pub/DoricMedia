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

#import "Doric.h"
#import "DoricVideoViewNode.h"
#import <MediaPlayerFramework/MediaPlayer.h>

@implementation DoricVideoViewNode

- (YPPVideoView *)build {
    return [[YPPVideoView alloc] init];
}

- (void)blendView:(YPPVideoView *)view forPropName:(NSString *)name propValue:(id)prop {
    if ([name isEqualToString:@"mediaPlayerOptions"]) {
        
    } else {
        [super blendView:view forPropName:name propValue:prop];
    }
}

- (void)blend:(NSDictionary *)props {
    [super blend:props];
    [self.view.superview setNeedsLayout];
}
@end

