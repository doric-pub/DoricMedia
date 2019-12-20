import { Panel, Group, vlayout, layoutConfig, Gravity, IVLayout, Color, navbar } from "doric"
import { video } from "./widget/video"

@Entry
class Media extends Panel {
    onShow() {
        navbar(context).setTitle("doriclib-media")
    }
    build(rootView: Group): void {
        vlayout([
            video({
                path: ""
            })
        ])
            .apply({
                layoutConfig: layoutConfig().exactly().a(Gravity.Center),
                width: 400,
                height: 400,
                space: 20,
                border: {
                    color: Color.BLUE,
                    width: 1,
                },
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}