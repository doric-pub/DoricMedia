package pub.doric.media;


import android.slkmedia.mediaplayer.MediaPlayer;
import android.slkmedia.mediaplayer.VideoTextureView;
import android.slkmedia.mediaplayer.VideoViewListener;

import com.github.pengfeizhou.jscore.JSValue;

import pub.doric.DoricContext;
import pub.doric.extension.bridge.DoricMethod;
import pub.doric.extension.bridge.DoricPlugin;
import pub.doric.shader.ViewNode;

@DoricPlugin(name = "Video")
public class VideoViewNode extends ViewNode<VideoTextureView> {

    private MediaPlayer.MediaPlayerOptions mediaPlayerOptions;
    private VideoViewListener videoViewListener = new VideoViewListener() {
        @Override
        public void onPrepared() {
            callJSResponse(onPrepared);
        }

        @Override
        public void onError(int what, int extra) {
            callJSResponse(onError, what, extra);
        }

        @Override
        public void onInfo(int what, int extra) {
            callJSResponse(onInfo, what, extra);
        }

        @Override
        public void onCompletion() {
            callJSResponse(onCompletion);
        }

        @Override
        public void onVideoSizeChanged(int width, int height) {
            callJSResponse(onVideoSizeChanged, width, height);
        }

        @Override
        public void onBufferingUpdate(int percent) {
            callJSResponse(onBufferingUpdate, percent);
        }

        @Override
        public void OnSeekComplete() {
            callJSResponse(OnSeekComplete);
        }
    };
    private String onPrepared;
    private String onError;
    private String onInfo;
    private String onCompletion;
    private String onVideoSizeChanged;
    private String onBufferingUpdate;
    private String OnSeekComplete;

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
                view.setListener(videoViewListener);
            }
            break;
            case "onPrepared": {
                this.onPrepared = prop.asString().value();
            }
            break;
            case "onError": {
                this.onError = prop.asString().value();
            }
            break;
            case "onInfo": {
                this.onInfo = prop.asString().value();
            }
            break;
            case "onCompletion": {
                this.onCompletion = prop.asString().value();
            }
            break;
            case "onVideoSizeChanged": {
                this.onVideoSizeChanged = prop.asString().value();
            }
            break;
            case "onBufferingUpdate": {
                this.onBufferingUpdate = prop.asString().value();
            }
            break;
            case "OnSeekComplete": {
                this.OnSeekComplete = prop.asString().value();
            }
            break;
            default:
                super.blend(view, name, prop);
                break;
        }
    }

    @DoricMethod
    public void initialize() {
        this.mView.initialize(mediaPlayerOptions);
    }

    @DoricMethod
    public void setDataSource(JSValue value) {
        System.out.println();
        this.mView.setDataSource(
                value.asObject().getProperty("path").asString().value(),
                value.asObject().getProperty("type").asNumber().toInt()
        );
    }

    @DoricMethod
    public void prepareAsync() {
        this.mView.prepareAsync();
    }

    @DoricMethod
    public void prepareAsyncWithStartPos(JSValue value) {
        this.mView.prepareAsyncWithStartPos(value.asObject().getProperty("startPosMs").asNumber().toInt());
    }

    @DoricMethod
    public void start() {
        this.mView.start();
    }

    @DoricMethod
    public void pause() {
        this.mView.pause();
    }

    @DoricMethod
    public void stop(JSValue value) {
        this.mView.stop(value.asObject().getProperty("blackDisplay").asBoolean().value());
    }

    @DoricMethod
    public void seekTo(JSValue value) {
        this.mView.seekTo(value.asObject().getProperty("msec").asNumber().toInt());
    }

    @DoricMethod
    public void grabDisplayShot(JSValue value) {
        this.mView.grabDisplayShot(value.asObject().getProperty("shotPath").asString().value());
    }

    @DoricMethod
    public void release() {
        this.mView.release();
    }

    @DoricMethod
    public int getCurrentPosition() {
        return this.mView.getCurrentPosition();
    }

    @DoricMethod
    public int getDuration() {
        return this.mView.getDuration();
    }

    @DoricMethod
    public void setFilter(JSValue value) {
        this.mView.setFilter(
                value.asObject().getProperty("type").asNumber().toInt(),
                value.asObject().getProperty("filterDir").asString().value()
        );
    }

    @DoricMethod
    public void setVolume(JSValue value) {
        this.mView.setVolume(value.asObject().getProperty("volume").asNumber().toFloat());
    }

    @DoricMethod
    public void setPlayRate(JSValue value) {
        this.mView.setPlayRate(value.asObject().getProperty("playrate").asNumber().toFloat());
    }
}
