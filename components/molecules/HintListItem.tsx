import React, { HTMLAttributes } from "react";
import { ProductDatoCms, Product } from "../../types/product";
import { datoCMSImageLoader } from "../../utils/next";
import ListElement from "../atom/list/ListElement";
import Image from "next/image";

interface Props extends HTMLAttributes<HTMLLIElement> {
  product: Product;
}
export default function HintListItem({ product, className, ...props }: Props) {
  const {
    name,
    photos: [photo],
  } = product;

  return (
    <ListElement
      className={`flex items-center gap-3 hover:text-primary cursor-pointer ${className}`}
      {...props}
    >
      <div className="relative h-9 w-9">
        {photo ? (
          <Image
            loader={datoCMSImageLoader}
            src={photo.url}
            alt={photo.fileName}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <p className="font-medium">{name}</p>
    </ListElement>
  );
}
