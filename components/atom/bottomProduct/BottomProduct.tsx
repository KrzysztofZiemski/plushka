import React, { HTMLAttributes } from "react";
import { ProductColor } from "../../../types/product";
import FavouriteButton from "../favouriteButton/FavouriteButton";

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
      <FavouriteButton
        onClick={toggleFavourite}
        iconProps={{ className: "w-5 h-auto" }}
        filled={isFavourite}
        aria-label={isFavourite ? "usuń z ulubionych" : "dodaj do ulubionych"}
      />
      <div className="flex gap-3">
        {colors.map(({ colorName, colorValue }) => {
          return (
            <div
              className="w-2.5 h-2.5"
              style={{ backgroundColor: colorValue.hex }}
              key={colorName}
            />
          );
        })}
      </div>
    </div>
  );
}
