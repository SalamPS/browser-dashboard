import { useState } from "react";
import SpotProvider from "../context/_SpotContext";
import SpotCAuth from "../context/_SpotCAuth";

export default function SpotAuth ({toggle}) {
  return (<SpotProvider>
    <SpotCAuth
      toggle={toggle}
    />
  </SpotProvider>);
}