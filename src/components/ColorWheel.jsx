import React, { useState, Fragment } from "react";
import Wheel from "@uiw/react-color-wheel";
import ShadeSlider from "@uiw/react-color-shade-slider";
import { hsvaToHex } from "@uiw/color-convert";
import { useColorWheel } from "../context/ColorWheelContext";

function ColorWheel() {
  const { hsva, setHsva } = useColorWheel();

  return (
    <Fragment>
      <Wheel
        color={hsva}
        onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
        /* Passing the style prop is required in the topmost element. */
        pointer={({ color, style }) => {
          return (
            <div style={style}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  transform: "translate(-5px, -5px)",
                  backgroundColor: color,
                  border: "1px solid #000",
                }}
              />
            </div>
          );
        }}
      />
      <ShadeSlider
        hsva={hsva}
        style={{ width: 210, marginTop: 20 }}
        onChange={(newShade) => {
          setHsva({ ...hsva, ...newShade });
        }}
      />
      <div
        style={{
          width: "100%",
          height: 34,
          marginTop: 20,
          background: hsvaToHex(hsva),
        }}
      ></div>
    </Fragment>
  );
}

export default ColorWheel;
