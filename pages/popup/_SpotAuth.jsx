import { useState } from "react";
import SpotProvider from "../context/_SpotContext";
import SpotCAuth from "../context/_SpotCAuth";

export default function SpotAuth () {
  return (<SpotProvider>
    <SpotCAuth/>
  </SpotProvider>);
}