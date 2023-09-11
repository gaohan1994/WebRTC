import { makeAutoObservable } from "mobx";
import { MediaStreamConfig } from "../constant";

export class ConnectManager {
  public localStream: MediaStream | null = null;

  public remoteStream: MediaStream | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public readonly connectSignalServer = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return void console.error(
        `Current browser does't support getUserMedia method`
      );
    }

    console.log("[connectSignalServer] begin connect signal server!");
    const mediaStream = await this.getUserMedia();

    console.log("success get user media: ", mediaStream);
    this.localMediaStreamHandler(mediaStream);
  };

  public readonly leave = () => {
    this.closeLocalMedia();
  };

  private readonly getUserMedia = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      MediaStreamConfig
    );

    return mediaStream;
  };

  /**
   * 将从设备上获取到的音视频轨道添加到本地 stream 流中
   *
   * @param mediaStream
   */
  private readonly localMediaStreamHandler = (mediaStream: MediaStream) => {
    if (this.localStream !== null) {
      console.log(
        "start handle local media stream. current local stream wan't null add tracks ",
        mediaStream
      );

      mediaStream.getAudioTracks().forEach((track) => {
        this.localStream?.addTrack(track);
        mediaStream.removeTrack(track);
      });
    } else {
      console.log(
        "start handle local media stream. current local stream was null",
        mediaStream
      );

      this.localStream = mediaStream;
    }
  };

  /**
   * 关闭本地媒体流
   * 当本地媒体流不为空的时候，遍历轨道，停止每个轨道
   *
   * @method closeLocalMedia
   */
  private readonly closeLocalMedia = () => {
    if (this.localStream !== null) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    this.localStream = null;
  };
}

const connectManager = new ConnectManager();

export default connectManager;
