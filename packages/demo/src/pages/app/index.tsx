import { Fragment, memo } from "react";
import Devices from "../devices";
import MediaStream from "../media-stream";

const App = () => (
  <Fragment>
    <Devices />
    <MediaStream />
  </Fragment>
);

export default memo(App);
