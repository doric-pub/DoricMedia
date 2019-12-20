import {
    Color,
    Gravity,
    Group,
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
            path: "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4",
        }).apply({
            layoutConfig: layoutConfig().exactly(),
            width: 400,
            height: 400,
            border: {
                color: Color.BLUE,
                width: 1,
            },
        })
        vlayout([
            videoNode,
            hlayout([
                text({
                    text: 'prepareAsyncToPlay',
                    onClick: () => {
                        videoNode.prepareAsyncToPlay()
                    }
                })
            ]).apply({
                layoutConfig: layoutConfig().exactly().a(Gravity.Center),
                width: 400,
                height: 100,
                border: {
                    color: Color.RED,
                    width: 1,
                },
            } as IHLayout)
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