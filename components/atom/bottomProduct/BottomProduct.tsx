import React, { HTMLAttributes } from "react";
import { Color, Product, ProductColor } from "../../../types/product";
import FavouriteButton from "../favouriteButton/FavouriteButton";

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
  toggleFavourite: () => void;
  isFavourite: boolean;
}

export default function BottomProduct({
  colors,
  className,
  toggleFavourite,
  isFavourite,
  ...props
}: Props) {
  return (
    <div
      className={`flex items-center h-10 border-t border-grey flex justify-between ${className}`}
      {...props}
    >
      <FavouriteButton onClick={toggleFavourite} className={``} />
      <div className="flex gap-3">
        {colors.map((el) => {
          const color = dictionaryColors[el.colorsBase];

          return color ? (
            <div
              className="w-2.5 h-2.5"
              style={{ backgroundColor: color }}
              key={el.id}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
