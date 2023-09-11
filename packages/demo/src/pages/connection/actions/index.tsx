import { memo } from "react";
import { observer } from "mobx-react";
import { Button } from "@mui/material";
import { ActionsContainer } from "./styles";
import { useConnectManager } from "../provider";

const Actions = observer(() => {
  const manager = useConnectManager();
  return (
    <ActionsContainer>
      <Button variant="contained" onClick={manager?.connectSignalServer}>
        连接信令服务器
      </Button>
      <Button variant="contained" onClick={manager?.leave}>
        退出
      </Button>
    </ActionsContainer>
  );
});

export default memo(Actions);
