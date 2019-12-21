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
import { IView, Property, View, layoutConfig } from "doric"

export class MediaPlayerOptions {
    mediaPlayerMode: number = 2

    recordMode: number = 0

    videoDecodeMode: number = 1

    externalRenderMode: number = 0

    backupDir?: string

    isLoadMediaStreamer: boolean = false

    isAccurateSeek: boolean = true

    isUseNewPrivateMediaPlayerCore: boolean = false

    http_proxy?: string

    enableAsyncDNSResolver: boolean = false

    isVideoOpaque: boolean = true

    pauseInBackground: boolean = false
}

export interface IVideo extends IView {
    mediaPlayerOptions?: MediaPlayerOptions
}

export class Video extends View implements IVideo {
    @Property
    mediaPlayerOptions?: MediaPlayerOptions

    setDataSource(path: string, type: number) {
        return this.nativeChannel(context, 'setDataSource')({
            path: path,
            type: type,
        }) as Promise<boolean>
    }

    prepareAsyncToPlay() {
        return this.nativeChannel(context, 'prepareAsyncToPlay')() as Promise<boolean>
    }
}

export function video(config: IVideo) {
    const ret = new Video
    ret.layoutConfig = layoutConfig().wrap()
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret)
    }
    return ret
}