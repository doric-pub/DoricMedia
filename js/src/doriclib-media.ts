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

    msec: number = 5000

    onShow() {
        navbar(context).setTitle("doriclib-media")
    }

    build(rootView: Group): void {
        let logNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().exactly()
            it.width = 400
            it.height = 160
            it.text = ""
            it.multiline = true
            it.textAlignment = Gravity.Left
        })
        let videoNode = video({
            mediaPlayerOptions: new MediaPlayerOptions(),
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
            layoutConfig: layoutConfig().exactly(),
            width: 400,
            height: 167,
            border: {
                color: Color.BLUE,
                width: 1,
            },
        })
        let pathNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().exactly()
            it.width = 400
            it.height = 50
            it.text = "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
            it.multiline = false
            it.textAlignment = Gravity.Left
            it.onTextChange = (text: string) => {
                it.text = text
            }
        })
        vlayout([
            videoNode,
            pathNode,
            logNode,
            flowlayout({
                layoutConfig: layoutConfig().wrap(),
                itemCount: 8,
                columnCount: 3,
                columnSpace: 10,
                rowSpace: 10,
                renderItem: (index) => {
                    return new FlowLayoutItem().apply({
                        layoutConfig: layoutConfig().wrap(),
                    }).also(it => {
                        if (index == 0) {
                            it.addChild(text({
                                text: "setDataSource",
                                width: 120,
                                height: 50,
                                textSize: 17,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.setDataSource(pathNode.text!, 3)
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 1) {
                            it.addChild(text({
                                text: "prepareAsync",
                                width: 120,
                                height: 50,
                                textSize: 17,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.prepareAsync()
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 2) {
                            it.addChild(text({
                                text: "prepareAsyncWithStartPos",
                                width: 120,
                                height: 50,
                                textSize: 9,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.prepareAsyncWithStartPos(0)
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 3) {
                            it.addChild(text({
                                text: "start",
                                width: 120,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.start()
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 4) {
                            it.addChild(text({
                                text: "pause",
                                width: 120,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.pause()
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 5) {
                            it.addChild(text({
                                text: "",
                                width: 120,
                                height: 50,
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 6) {
                            it.addChild(text({
                                text: "seekTo",
                                width: 120,
                                height: 50,
                                textSize: 20,
                                backgroundColor: Color.RED,
                                textColor: Color.WHITE,
                                onClick: () => {
                                    videoNode.seekTo(this.msec)
                                },
                                layoutConfig: layoutConfig().exactly(),
                            }),)
                        } else if (index == 7) {
                            it.addChild((new Input).also(it => {
                                it.layoutConfig = layoutConfig().exactly()
                                it.width = 120
                                it.height = 50
                                it.text = this.msec.toString()
                                it.multiline = false
                                it.textAlignment = Gravity.Left
                                it.onTextChange = (text: string) => {
                                    this.msec = parseInt(text)
                                }
                            }),)
                        }
                    })
                },
            })
        ])
            .apply({
                layoutConfig: layoutConfig().wrap().a(Gravity.Center),
                width: 400,
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}