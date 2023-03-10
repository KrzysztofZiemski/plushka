import Image from "next/image";
import { useRouter } from "next/router";
import { HTMLAttributes, useCallback } from "react";
import { Product } from "../../types/product";
import { Amount } from "../../utils/amount";
import { datoCMSImageLoader } from "../../utils/next";
import { getPath } from "../../utils/routing";
import BottomProduct from "../atom/bottomProduct/BottomProduct";

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: Product;
  toggleFavourite: (product: Product) => void;
  isFavourite: boolean;
}
export default function ProductListItem({
  item,
  className,
  toggleFavourite,
  isFavourite,
  ...props
}: Props) {
  const router = useRouter();
  const { colors, name, slug, photos, id, shortDescription, price } = item;

  const goToProductDeatail = () => {
    router.push(getPath("product-detail")(slug));
  };

  const handleToggleFavourite = useCallback(
    () => toggleFavourite(item),
    [item, toggleFavourite]
  );

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
        {!!photos?.length && (
          <Image
            loader={datoCMSImageLoader}
            key={photos[0].fileName}
            src={photos[0].url}
            alt={photos[0].fileName}
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
        <div className="font-medium text-lg text-right mb-9">
          {new Amount(price, "PLN").price}
        </div>
        <BottomProduct
          toggleFavourite={handleToggleFavourite}
          colors={colors}
          className="mt-auto py-4 mt-auto"
          isFavourite={isFavourite}
        />
      </div>
    </div>
  );
}
