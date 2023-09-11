import { observer } from "mobx-react";
import { memo, useEffect, useRef } from "react";
import { useConnectManager } from "../provider";

const Local = observer(() => {
  const manager = useConnectManager();
  const localStreamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (manager?.localStream !== null) {
      localStreamRef.current!.srcObject = manager!.localStream;
    }
  }, [manager?.localStream]);

  return (
    <div>
      <video ref={localStreamRef} autoPlay playsInline />
    </div>
  );
});

export default memo(Local);
