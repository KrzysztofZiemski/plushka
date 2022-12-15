import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SearchIcon } from "../../../assets/icons";
import logo from "../../../assets/logo.png";
import useSearchProducts from "../../../hooks/useSearchProducts";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getPath } from "../../../utils/routing";
import MainInput from "../../atom/input/MainInput";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";
import HintListItem from "../../molecules/HintListItem";
import DesktopNavigation from "./navigation/DesktopNavigation";
import styles from "./topBar.module.css";

interface Props {
  products: Product[];
  categories: Category[];
  goToProduct: (productName: string) => void;
}

export default function DesktopTopBar({
  categories,
  products,
  goToProduct,
}: Props) {
  const router = useRouter();
  const { search, setSearch, filtered } = useSearchProducts(products);

  const goToFavourites = useCallback(() => {
    router.push(getPath("favourites")(""));
  }, [router]);

  const isEmptyResults = search.length >= 3 && filtered.length === 0;

  return (
    <div className="hidden w-full bg-white z-10 px-6 py-6  md:block">
      <div className="flex gap-3 w-full">
        <Link href={"/"} className="shrink-0" style={{ marginRight: "8%" }}>
          <Image src={logo} alt="logo Plushka" className="h-40 w-auto" />
        </Link>
        <div className="grow">
          <DesktopNavigation
            categories={categories}
            path={router.asPath}
            goToFavourites={goToFavourites}
          />
        </div>
      </div>
      <div className={`${styles.searchContainer} grow w-1/2 ml-auto max-w-sm`}>
        <MainInput
          className=""
          AdormentEnd={<SearchIcon />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={`relative ${styles.listContainer} `}>
          <List className="absolute drop-shadow-lg ease-in duration-100 rounded overflow-auto box-shadow max-h-60 top-0 inset-x-0 z-20 bg-white">
            {isEmptyResults && <ListElement>Brak wyników</ListElement>}
            {filtered.map((product) => {
              return (
                <HintListItem
                  product={product}
                  key={product.id}
                  onClick={() => goToProduct(product.slug)}
                />
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}
