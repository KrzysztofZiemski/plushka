import React, { HTMLAttributes } from "react";
import { Product } from "../../types/product";
import { datoCMSImageLoader, isClient } from "../../utils/next";
import Image from "next/image";
import ColorBars from "../atom/colorsBars/ColorBars";
import { useRouter } from "next/router";
import { getPath } from "../../utils/routing";

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: Product;
}
export default function ProductListItem({
  item: { photos, name, shortDescription, price, productColors, id, slugName },
  className,
  ...props
}: Props) {
  const router = useRouter();

  const goToProductDeatail = () => {
    router.push(getPath("product-detail")(slugName));
  };

  const mainPhoto = photos[0];

  return (
    <div
      className={`flex flex-col main-shadow ${className || ""}`}
      id={id}
      {...props}
    >
      <div
        className="h-96 w-auto w-full relative overflow-hidden cursor-poinet"
        onClick={goToProductDeatail}
      >
        {mainPhoto && (
          <Image
            loader={datoCMSImageLoader}
            key={mainPhoto.id}
            src={mainPhoto.url}
            alt={mainPhoto.alt}
            fill
            loading="lazy"
            className="object-cover w-full cursor-pointer"
          />
        )}
      </div>
      <div className="flex flex-col grow px-5 mt-5">
        <h2
          className="cursor-pointer hover:text-primary "
          onClick={goToProductDeatail}
        >
          {name}
        </h2>
        <p>{shortDescription}</p>
        <div className="font-medium text-lg text-right mb-9">{`${price} zł`}</div>
        <ColorBars
          colors={productColors}
          className="mt-auto py-4 border-t border-grey flex justify-end mt-auto"
        />
      </div>
    </div>
  );
}
