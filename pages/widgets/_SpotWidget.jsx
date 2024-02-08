/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import SpotProvider from "../context/_SpotContext";
import SpotCWidget from "../context/_SpotCWidget";

export default function SpotWidget ({fetchWidget, type, remove, id, setTogglePopup}) {
  return (<SpotProvider>
    <SpotCWidget
      fetchWidget={fetchWidget}
      type={type}
      remove={remove}
      id={id}
      setTogglePopup={setTogglePopup}
    />
  </SpotProvider>)
}