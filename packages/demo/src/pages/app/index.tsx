import { Fragment, memo } from "react";
import Devices from "../devices";
import Connection from "../connection";

const App = () => (
  <Fragment>
    <Devices />
    <Connection />
  </Fragment>
);

export default memo(App);
