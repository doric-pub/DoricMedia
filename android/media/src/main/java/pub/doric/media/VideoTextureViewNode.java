package pub.doric.media;


import android.slkmedia.mediaplayer.VideoTextureView;

import pub.doric.DoricContext;
import pub.doric.extension.bridge.DoricPlugin;
import pub.doric.shader.ViewNode;

@DoricPlugin(name = "Video")
public class VideoTextureViewNode extends ViewNode<VideoTextureView> {
    public VideoTextureViewNode(DoricContext doricContext) {
        super(doricContext);
    }

    @Override
    protected VideoTextureView build() {
        return new VideoTextureView(getContext());
    }
}
