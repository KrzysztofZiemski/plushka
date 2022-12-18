import Image from "next/image";
import { useRouter } from "next/router";
import { HTMLAttributes, useCallback } from "react";
import { Product } from "../../types/product";
import { Amount } from "../../utils/amount";
import { hygraphLoader } from "../../utils/next";
import { getPath } from "../../utils/routing";
import BottomProduct from "../atom/bottomProduct/BottomProduct";
import MainButton from "../atom/button/MainButton";

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
            loader={hygraphLoader}
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
        <p className="mb-9 max-h-60 overflow-auto">{shortDescription}</p>
        <div className="w-full flex justify-between font-medium text-lg mt-auto">
          <span>{new Amount(price, "PLN").price}</span>
          <MainButton size="small">Zapytaj</MainButton>
        </div>
        <BottomProduct
          toggleFavourite={handleToggleFavourite}
          colors={colors}
          className="py-4 mt-9"
          isFavourite={isFavourite}
        />
      </div>
    </div>
  );
}
