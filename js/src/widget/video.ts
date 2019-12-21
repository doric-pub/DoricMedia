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

    onPrepared?: Function

    onError?: Function

    onInfo?: Function

    onCompletion?: Function

    onVideoSizeChanged?: Function

    onBufferingUpdate?: Function

    OnSeekComplete?: Function
}

export class Video extends View implements IVideo {
    @Property
    mediaPlayerOptions?: MediaPlayerOptions

    @Property
    onPrepared?: Function

    @Property
    onError?: Function

    @Property
    onInfo?: Function

    @Property
    onCompletion?: Function

    @Property
    onVideoSizeChanged?: Function

    @Property
    onBufferingUpdate?: Function

    @Property
    OnSeekComplete?: Function

    setDataSource(path: string, type: number) {
        this.nativeChannel(context, 'setDataSource')({
            path: path,
            type: type,
        })
    }

    prepareAsync() {
        this.nativeChannel(context, 'prepareAsync')()
    }

    prepareAsyncWithStartPos(startPosMs: number) {
        this.nativeChannel(context, 'prepareAsyncWithStartPos')({
            startPosMs: startPosMs
        })
    }

    start() {
        this.nativeChannel(context, 'start')()
    }

    pause() {
        this.nativeChannel(context, 'pause')()
    }

    seekTo(msec: number) {
        this.nativeChannel(context, 'seekTo')({
            msec: msec
        })
    }

    stop(blackDisplay: boolean) {
        this.nativeChannel(context, 'stop')({
            blackDisplay: blackDisplay
        })
    }

    grabDisplayShot(shotPath: string) {
        this.nativeChannel(context, 'grabDisplayShot')({
            shotPath: shotPath
        })
    }

    initialize() {
        this.nativeChannel(context, 'initialize')()
    }

    release() {
        this.nativeChannel(context, 'release')()
    }

    getCurrentPosition() {
        return this.nativeChannel(context, 'getCurrentPosition')() as Promise<number>
    }

    getDuration() {
        return this.nativeChannel(context, 'getDuration')() as Promise<number>
    }

    setFilter(type: number, filterDir: string) {
        this.nativeChannel(context, 'setFilter')({
            type: type,
            filterDir: filterDir
        })
    }

    setVolume(volume: number) {
        this.nativeChannel(context, 'setVolume')({
            volume: volume
        })
    }

    setPlayRate(playrate: number) {
        this.nativeChannel(context, 'setPlayRate')({
            playrate: playrate
        })
    }

    setVideoScalingMode(mode: number) {
        this.nativeChannel(context, 'setVideoScalingMode')({
            mode: mode
        })
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