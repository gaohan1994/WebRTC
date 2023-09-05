import { Fragment, memo } from "react";
import LocalPreview from "./local-preview";

const MediaStream = () => (
  <Fragment>
    <LocalPreview />
  </Fragment>
);

export default memo(MediaStream);
