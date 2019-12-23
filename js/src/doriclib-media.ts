import {
    Color,
    FlowLayoutItem,
    Gravity,
    Group,
    Input,
    IVLayout,
    Panel,
    layoutConfig,
    navbar,
    text,
    flowlayout,
    vlayout
} from "doric"
import {
    MediaPlayerOptions,
    video
} from "./widget/video"

@Entry
class Media extends Panel {

    url: string = "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
    mediaPlayerOptions = new MediaPlayerOptions()
    startPosMs: number = 10000
    msec: number = 5000
    blackDisplay: boolean = false
    shotPath: string = "test"
    volume: number = 0
    playrate: number = 0
    videoScalingMode: number = 0
    scaleRate: number = 0.5
    videoRotationMode: number = 0
    isLooping: boolean = false

    onShow() {
        navbar(context).setTitle("doriclib-media")
    }

    build(rootView: Group): void {
        let logNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().just()
            it.width = 400
            it.height = 160
            it.text = ""
            it.multiline = true
            it.textAlignment = Gravity.Left
        })
        let videoNode = video({
            mediaPlayerOptions: this.mediaPlayerOptions,
            onPrepared: () => {
                logNode.text += "onPrepared\n"
            },
            onError: (what: number, extra: number) => {
                logNode.text += "onError: " + what + ", " + extra + "\n"
            },
            onInfo: (what: number, extra: number) => {
                // logNode.text += "onInfo: " + what + ", " + extra + "\n"
            },
            onCompletion: () => {
                logNode.text += "onCompletion\n"
            },
            onVideoSizeChanged: (width: number, height: number) => {
                logNode.text += "onVideoSizeChanged: " + width + ", " + height + "\n"
            },
            onBufferingUpdate: (percent: number) => {
                logNode.text += "onBufferingUpdate: " + percent + "\n"
            },
            OnSeekComplete: () => {
                logNode.text += "OnSeekComplete\n"
            },
        }).apply({
            layoutConfig: layoutConfig().just(),
            width: 400,
            height: 167,
            border: {
                color: Color.BLUE,
                width: 1,
            },
        })
        let pathNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().just()
            it.width = 400
            it.height = 50
            it.text = this.url
            it.multiline = false
            it.textAlignment = Gravity.Left
            it.onTextChange = (text: string) => {
                it.text = text
            }
        })
        let currentPositionNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().just()
            it.width = 180
            it.height = 50
            it.text = ""
            it.multiline = false
            it.textAlignment = Gravity.Left
            it.onTextChange = (text: string) => {
                this.shotPath = text
            }
        })
        let durationNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().just()
            it.width = 180
            it.height = 50
            it.text = ""
            it.multiline = false
            it.textAlignment = Gravity.Left
            it.onTextChange = (text: string) => {
                this.shotPath = text
            }
        })
        vlayout([
            videoNode,
            pathNode,
            logNode,
            flowlayout({
                layoutConfig: layoutConfig().fit(),
                itemCount: 31,
                columnCount: 2,
                columnSpace: 10,
                rowSpace: 10,
                renderItem: (index) => {
                    return new FlowLayoutItem().apply({
                        layoutConfig: layoutConfig().fit(),
                    }).also(it => {
                        if (index == 0) {
                            it.addChild(text({
                                text: "setDataSource",
                                width: 180,
                                height: 50,
                                textSize: 17,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setDataSource(pathNode.text!, 3)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 1) {
                            it.addChild(text({
                                text: "prepareAsync",
                                width: 180,
                                height: 50,
                                textSize: 17,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.prepareAsync()
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 2) {
                            it.addChild(text({
                                text: "prepareAsyncWithStartPos",
                                width: 180,
                                height: 50,
                                textSize: 15,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.prepareAsyncWithStartPos(this.startPosMs)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 3) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.startPosMs.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.startPosMs = parseInt(text)
                                }
                            }),)
                        } else if (index == 4) {
                            it.addChild(text({
                                text: "start",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.start()
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 5) {
                            it.addChild(text({
                                text: "pause",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.pause()
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 6) {
                            it.addChild(text({
                                text: "seekTo",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.seekTo(this.msec)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 7) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.msec.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.msec = parseInt(text)
                                }
                            }),)
                        } else if (index == 8) {
                            it.addChild(text({
                                text: "stop",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.stop(this.blackDisplay)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 9) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.blackDisplay.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.blackDisplay = Boolean(text)
                                }
                            }),)
                        } else if (index == 10) {
                            it.addChild(text({
                                text: "grabDisplayShot",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.grabDisplayShot(this.shotPath)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 11) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.shotPath
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.shotPath = text
                                }
                            }),)
                        } else if (index == 12) {
                            it.addChild(text({
                                text: "release",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.release()
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 13) {
                            it.addChild(text({
                                text: "initialize",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.initialize()
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 14) {
                            it.addChild(text({
                                text: "getCurrentPosition",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.getCurrentPosition()
                                        .then((currentPosition) => {
                                            currentPositionNode.text = currentPosition.toString()
                                        })
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 15) {
                            it.addChild(currentPositionNode,)
                        } else if (index == 16) {
                            it.addChild(text({
                                text: "getDuration",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.getDuration()
                                        .then((duration) => {
                                            durationNode.text = duration.toString()
                                        })
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 17) {
                            it.addChild(durationNode,)
                        } else if (index == 18) {
                            it.addChild(text({
                                text: "setVolume",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setVolume(this.volume)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 19) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.volume.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.volume = parseFloat(text)
                                }
                            }),)
                        } else if (index == 20) {
                            it.addChild(text({
                                text: "setPlayRate",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setPlayRate(this.playrate)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 21) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.playrate.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.playrate = parseFloat(text)
                                }
                            }),)
                        } else if (index == 22) {
                            it.addChild(text({
                                text: "setVideoScalingMode",
                                width: 180,
                                height: 50,
                                textSize: 18,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setVideoScalingMode(this.videoScalingMode)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 23) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.videoScalingMode.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.videoScalingMode = parseInt(text)
                                }
                            }),)
                        } else if (index == 24) {
                            it.addChild(text({
                                text: "setVideoScaleRate",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setVideoScaleRate(this.scaleRate)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 25) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.scaleRate.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.scaleRate = parseFloat(text)
                                }
                            }),)
                        } else if (index == 26) {
                            it.addChild(text({
                                text: "setVideoRotationMode",
                                width: 180,
                                height: 50,
                                textSize: 18,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setVideoRotationMode(this.videoRotationMode)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 27) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.videoRotationMode.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.videoRotationMode = parseInt(text)
                                }
                            }),)
                        } else if (index == 28) {
                            it.addChild(text({
                                text: "setLooping",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setLooping(this.isLooping)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        } else if (index == 29) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().just()
                                it.width = 180
                                it.height = 50
                                it.text = this.isLooping.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.isLooping = Boolean(text)
                                }
                            }),)
                        } else if (index == 30) {
                            it.addChild(text({
                                text: "preLoadDataSource",
                                width: 180,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.preLoadDataSource(this.url)
                                },
                                layoutConfig: layoutConfig().just(),
                            }),)
                        }
                    })
                },
            })
        ])
            .apply({
                layoutConfig: layoutConfig().fit().configAlignmnet(Gravity.Center),
                width: 400,
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}