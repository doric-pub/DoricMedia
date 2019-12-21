import {
    Color,
    Gravity,
    Group,
    Input,
    IVLayout,
    Panel,
    layoutConfig,
    navbar,
    text,
    vlayout,
    hlayout,
    IHLayout
} from "doric"
import {
    MediaPlayerOptions,
    video
} from "./widget/video"

@Entry
class Media extends Panel {

    onShow() {
        navbar(context).setTitle("doriclib-media")
    }

    build(rootView: Group): void {
        let logNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().exactly()
            it.width = 400
            it.height = 333
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
            text({
                text: "prepareAsyncToPlay",
                textSize: 20,
                backgroundColor: Color.RED,
                textColor: Color.WHITE,
                onClick: () => {
                    videoNode.setDataSource(pathNode.text!, 3)
                    videoNode.prepareAsyncToPlay()
                },
                layoutConfig: layoutConfig().exactly(),
                width: 200,
                height: 50,
            }),
        ])
            .apply({
                layoutConfig: layoutConfig().exactly().a(Gravity.Center),
                width: 400,
                height: 600,
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}