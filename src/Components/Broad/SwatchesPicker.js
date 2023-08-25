import React from "react";
import { HexColorPicker } from "react-colorful";
import { presetColors } from "../../Common/Constant";

export const SwatchesPicker = ({ color, onChange }) => {
  const handleChange = (e) => {
    onChange((prvState) => ({
      ...prvState,
      color: e,
    }));
  };
  return (
    <div className="picker">
      <HexColorPicker color={color} onChange={handleChange} />

      <div className="picker__swatches">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="picker__swatch"
            style={{ background: presetColor }}
            onClick={() => handleChange(presetColor)}
          />
        ))}
      </div>
    </div>
  );
};
