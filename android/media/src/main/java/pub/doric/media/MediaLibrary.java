package pub.doric.media;

import pub.doric.DoricComponent;
import pub.doric.DoricLibrary;
import pub.doric.DoricRegistry;

@DoricComponent
public class MediaLibrary extends DoricLibrary {
    @Override
    public void load(DoricRegistry registry) {
        registry.registerViewNode(VideoViewNode.class);
    }
}