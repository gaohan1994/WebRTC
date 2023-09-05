import { memo, useEffect, useRef } from "react";

const LocalPreview = () => {
  const previewRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        previewRef.current!.srcObject = mediaStream;
        console.log("mediaStream");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <video ref={previewRef} autoPlay playsInline />
    </div>
  );
};

export default memo(LocalPreview);
