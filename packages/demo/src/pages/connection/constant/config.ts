export const RTCConfig: RTCConfiguration = {
  iceServers: [
    {
      /**
       * TURN 服务器地址
       */
      urls: "turn:xxx.avdancedu.com:3478",
      username: "xxx",
      credential: "xxx",
    },
  ],
  iceTransportPolicy: "relay",
  iceCandidatePoolSize: 0,
};

export const MediaStreamConfig: MediaStreamConstraints = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
};
