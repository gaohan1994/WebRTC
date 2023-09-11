import { Socket, io } from "socket.io-client";
import { makeAutoObservable } from "mobx";
import { ServerEvents } from "@webrtc/shared";
import { RTCConfig, ServerUri, State } from "../constant";

class StateManager {
  public socket: Socket;

  public state: State = State.Init;

  private rtcPeerConnection: RTCPeerConnection | null = null;

  constructor() {
    makeAutoObservable(this);

    this.socket = io(ServerUri);

    this.socket.on(ServerEvents.Joined, this.socketJoinedHandler);
  }

  private readonly socketJoinedHandler = (room: string, id: string) => {
    console.log(`receive room ${room} joined message, id : ${id}`);

    this.state = State.Joined;

    /**
     * 创建 RTCPeerConnection
     * 并绑定音视频轨道
     */
    this.createRTCPeerConnection();
  };

  private readonly createRTCPeerConnection = () => {
    console.log("create rtc peer connection");

    if (this.rtcPeerConnection !== null) {
      return console.log(`rtc peer connection has been already created!`);
    }

    this.rtcPeerConnection = new RTCPeerConnection(RTCConfig);
    console.log("this.rtcPeerConnection", this.rtcPeerConnection);

    this.rtcPeerConnection.onicecandidate = (event) => {
      const { candidate } = event;

      console.log(`candidate ${JSON.stringify(candidate)}`);

      if (candidate) {
        /**
         * 应该发送 candidate 到对端
         */
        this.socket.emit("message", {
          customdata: "data",
        });
      }
    };
  };
}

export default StateManager;
