import React, { HTMLAttributes } from "react";
import { Product } from "../../types/product";
import { datoCMSImageLoader, isClient } from "../../utils/next";
import Image from "next/image";
import ColorBars from "../atom/colorsBars/ColorBars";

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: Product;
}
export default function ProductListItem({
  item: { photos, name, shortDescription, price, productColors },
  className,
  ...props
}: Props) {
  const mainPhoto = photos[0];

  return (
    <div className={`main-shadow ${className || ""}`} {...props}>
      <div className="h-96 w-full relative overflow-hidden">
        {mainPhoto && (
          <Image
            loader={datoCMSImageLoader}
            key={mainPhoto.id}
            src={mainPhoto.url}
            alt={mainPhoto.alt}
            fill
            className="object-cover w-full"
          />
        )}
      </div>
      <div className="px-5 mt-5">
        <h2>{name}</h2>
        <p>{shortDescription}</p>
        <div className="font-medium text-lg text-right mb-9">{`${price} zł`}</div>
        <div className="py-4 border-y border-grey flex justify-end ">
          <ColorBars colors={productColors} />
        </div>
      </div>
    </div>
  );
}
