import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { CategoryDatoCms, Category } from "../../../types/category";
import { ProductDatoCms, Product } from "../../../types/product";
import { getTreeCategories } from "../../../utils/category";
import { getPath } from "../../../utils/routing";
import DesktopTopBar from "./DesktopTopBar";
import MobileTopBar from "./MobileTopBar";

interface Props {
  products: Product[];
  categories: Category[];
}
export default function TopBar({ products, categories }: Props) {
  const router = useRouter();

  const goToProduct = useCallback(
    (productName: string) => {
      router.push(getPath("product-detail")(productName));
    },
    [router]
  );

  return (
    <>
      <MobileTopBar
        products={products}
        categories={categories}
        goToProduct={goToProduct}
      />
      <DesktopTopBar
        products={products}
        categories={categories}
        goToProduct={goToProduct}
      />
    </>
  );
}
