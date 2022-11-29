import React, { HTMLAttributes } from "react";
import { Color, ProductColor } from "../../../types/product";

const dictionaryColors = {
  [Color.black]: "black",
  [Color.blue]: "blue",
  [Color.orange]: "orange",
  [Color.brown]: "brown",
  [Color.green]: "green",
  [Color.pink]: "pink",
  [Color.violet]: "violet",
  [Color.white]: "white",
  [Color.yellow]: "yellow",
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  colors: ProductColor[];
}

export default function ColorBars({ colors, ...props }: Props) {
  return (
    <div {...props}>
      {colors.map((el) => {
        const color = dictionaryColors[el.colorsBase];

        return color ? (
          <div className="w-2.5 h-2.5" style={{ backgroundColor: color }} />
        ) : null;
      })}
    </div>
  );
}
