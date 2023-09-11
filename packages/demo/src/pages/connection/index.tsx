import { memo } from "react";
import { Grid } from "@mui/material";
import Actions from "./actions";
import Local from "./local";
import Remote from "./remote";
import { ConnectManagerContext } from "./provider";
import { connectManager } from "./manager";
import { observer } from "mobx-react";

const Connection = observer(() => (
  <ConnectManagerContext.Provider value={{ manager: connectManager }}>
    <main>
      <Actions />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Local />
        </Grid>
        <Grid item xs={6}>
          <Remote />
        </Grid>
      </Grid>
    </main>
  </ConnectManagerContext.Provider>
));

export default memo(Connection);
