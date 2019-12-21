package pub.doric.media;


import android.slkmedia.mediaplayer.MediaPlayer;
import android.slkmedia.mediaplayer.VideoTextureView;

import com.github.pengfeizhou.jscore.JSValue;

import pub.doric.DoricContext;
import pub.doric.extension.bridge.DoricMethod;
import pub.doric.extension.bridge.DoricPlugin;
import pub.doric.shader.ViewNode;

@DoricPlugin(name = "Video")
public class VideoViewNode extends ViewNode<VideoTextureView> {

    private MediaPlayer.MediaPlayerOptions mediaPlayerOptions;

    public VideoViewNode(DoricContext doricContext) {
        super(doricContext);
    }

    @Override
    protected VideoTextureView build() {
        return new VideoTextureView(getContext());
    }

    @Override
    protected void blend(VideoTextureView view, String name, JSValue prop) {
        switch (name) {
            case "mediaPlayerOptions": {
                mediaPlayerOptions = new MediaPlayer.MediaPlayerOptions();

                JSValue mediaPlayerMode = prop.asObject().getProperty("mediaPlayerMode");
                mediaPlayerOptions.mediaPlayerMode = mediaPlayerMode.asNumber().toInt();

                JSValue recordMode = prop.asObject().getProperty("recordMode");
                mediaPlayerOptions.recordMode = recordMode.asNumber().toInt();

                JSValue videoDecodeMode = prop.asObject().getProperty("videoDecodeMode");
                mediaPlayerOptions.videoDecodeMode = videoDecodeMode.asNumber().toInt();

                JSValue externalRenderMode = prop.asObject().getProperty("externalRenderMode");
                mediaPlayerOptions.externalRenderMode = externalRenderMode.asNumber().toInt();

                JSValue backupDir = prop.asObject().getProperty("backupDir");
                if (!backupDir.isNull()) {
                    mediaPlayerOptions.backupDir = backupDir.asString().toString();
                }

                JSValue isLoadMediaStreamer = prop.asObject().getProperty("isLoadMediaStreamer");
                mediaPlayerOptions.isLoadMediaStreamer = isLoadMediaStreamer.asBoolean().value();

                JSValue isAccurateSeek = prop.asObject().getProperty("isAccurateSeek");
                mediaPlayerOptions.isAccurateSeek = isAccurateSeek.asBoolean().value();

                JSValue isUseNewPrivateMediaPlayerCore = prop.asObject().getProperty("isUseNewPrivateMediaPlayerCore");
                mediaPlayerOptions.isUseNewPrivateMediaPlayerCore = isUseNewPrivateMediaPlayerCore.asBoolean().value();

                JSValue http_proxy = prop.asObject().getProperty("http_proxy");
                if (!http_proxy.isNull()) {
                    mediaPlayerOptions.http_proxy = http_proxy.asString().toString();
                }

                JSValue enableAsyncDNSResolver = prop.asObject().getProperty("enableAsyncDNSResolver");
                mediaPlayerOptions.enableAsyncDNSResolver = enableAsyncDNSResolver.asBoolean().value();

                JSValue isVideoOpaque = prop.asObject().getProperty("isVideoOpaque");
                mediaPlayerOptions.isVideoOpaque = isVideoOpaque.asBoolean().value();

                JSValue pauseInBackground = prop.asObject().getProperty("pauseInBackground");
                mediaPlayerOptions.pauseInBackground = pauseInBackground.asBoolean().value();

                view.initialize(mediaPlayerOptions);
            }
            break;
            default:
                super.blend(view, name, prop);
                break;
        }
    }

    @DoricMethod
    public boolean setDataSource(JSValue value) {
        this.mView.setDataSource(
                value.asObject().getProperty("path").asString().value(),
                value.asObject().getProperty("type").asNumber().toInt()
        );
        return true;
    }

    @DoricMethod
    public boolean prepareAsyncToPlay() {
        this.mView.prepareAsyncToPlay();
        return true;
    }
}
