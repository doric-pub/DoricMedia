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
        let videoNode = video({
            mediaPlayerOptions: new MediaPlayerOptions(),
        }).apply({
            layoutConfig: layoutConfig().exactly(),
            width: 400,
            height: 300,
            border: {
                color: Color.BLUE,
                width: 1,
            },
        })
        let inputNode = (new Input).also(it => {
            it.layoutConfig = layoutConfig().exactly()
            it.width = 400
            it.height = 50
            it.text = "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
            it.multiline = false
            it.textAlignment = Gravity.Left
            it.onTextChange = (s) => {
            }
            it.onFocusChange = (f) => {
            }
        })
        vlayout([
            videoNode,
            inputNode,
            text({
                text: "prepareAsyncToPlay",
                textSize: 20,
                backgroundColor: Color.RED,
                textColor: Color.WHITE,
                onClick: () => {
                    videoNode.setDataSource(inputNode.text!, 3)
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
                height: 500,
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}