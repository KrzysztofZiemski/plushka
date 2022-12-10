import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { MenuBurgerIcon, SearchIcon } from "../../../assets/icons";
import useSearchProducts from "../../../hooks/useSearchProducts";
import { CategoryWitchChildren } from "../../../types/category";
import { Product } from "../../../types/product";
import { datoCMSImageLoader } from "../../../utils/next";
import TextButton from "../../atom/button/textButton";
import MainInput from "../../atom/input/MainInput";
import List from "../../atom/list/List";
import HintListItem from "../../molecules/HintListItem";
import MobileNavigation from "./navigation/MobileNavigation";
import styles from "./topBar.module.css";

interface Props {
  products: Product[];
  categories: CategoryWitchChildren[];
  goToProduct: (productName: string) => void;
}
export default function MobileTopBar({
  products,
  categories,
  goToProduct,
}: Props) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const { search, setSearch, filtered } = useSearchProducts(products);

  const handleToggleMenu = () => setIsMobileNavigationOpen((prev) => !prev);
  const handleClose = () => setIsMobileNavigationOpen(false);

  return (
    <div className="main-shadow w-full flex items-center justify-between gap-3 px-2 py-2 mb-3 md:hidden">
      <Link href="/" className="flex items-center shrink-0 ">
        <Image
          src={logo}
          alt="logo Plushka"
          loader={datoCMSImageLoader}
          className="h-14 w-auto"
        />
      </Link>
      <div className="flex grow gap-3 max-w-sm md:hidden ">
        <div className={`grow ${styles.searchContainer}`}>
          <MainInput
            AdormentEnd={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
          <div className={`relative ${styles.listContainer} `}>
            <List className="absolute ease-in duration-100 rounded overflow-auto box-shadow max-h-60 top-0 inset-x-0 z-20 bg-white">
              {filtered.map((product) => {
                return (
                  <HintListItem
                    product={product}
                    key={product.id}
                    onClick={() => goToProduct(product.slugName)}
                  />
                );
              })}
            </List>
          </div>
        </div>

        <TextButton
          onClick={handleToggleMenu}
          className="p-0"
          role="button"
          aria-label="Open navigation page"
        >
          <MenuBurgerIcon />
        </TextButton>
        <MobileNavigation
          categories={categories}
          isOpen={isMobileNavigationOpen}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}
