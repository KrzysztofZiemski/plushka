import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import crochetReverse from "../../../assets/crochet-reverse.png";
import crochetImage from "../../../assets/crochet.png";
import { MenuBurgerIcon, SearchIcon } from "../../../assets/icons";
import logo from "../../../assets/logo.png";
import { useSearch } from "../../../context/search";
import { Product } from "../../../types/product";
import { productFilter } from "../../../utils/filter";
import { datoCMSImageLoader } from "../../../utils/next";
import TextButton from "../../atom/button/textButton";
import MainInput from "../../atom/input/MainInput";
import List from "../../atom/list/List";
import FavouriteButton from "../../atom/favouriteButton/FavouriteButton";
import HintListItem from "../../molecules/HintListItem";
import Navigation from "../navigation/Navigation";
import styles from "./topBar.module.css";
import { useRouter } from "next/router";
import { getPath } from "../../../utils/routing";
import MobileNavigation from "../navigation/MobileNavigation";
import { Category } from "../../../types/category";
import { getTreeCategories } from "../../../utils/category";

interface Props {
  products: Product[];
  categories: Category[];
}
export default function MainTopBar({ products, categories }: Props) {
  const router = useRouter();
  const { search, setSearch } = useSearch();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  const treeCategories = useMemo(
    () => getTreeCategories(categories),
    [categories]
  );

  const filtered = useMemo(() => {
    if (search.length < 3) return [];
    return products
      .map((el) => ({ ...el, points: productFilter(el, search) }))
      .filter(({ points }) => points)
      .sort((a, b) => b.points - a.points);
  }, [search, products]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleGoToProduct = (productName: string) => {
    router.push(getPath("product-detail")(productName));
  };

  const handleToggleMenu = () => setIsMobileNavigationOpen((prev) => !prev);

  const handleClose = useCallback(
    () => setIsMobileNavigationOpen(false),
    [setIsMobileNavigationOpen]
  );

  return (
    <div className="main-shadow w-full flex items-center justify-between gap-3 px-2 py-2 mb-3 md:items-stretch sticky bg-white z-10 top-0 md:px-6 md:py-6 md:shadow-none md:static">
      <Link href="/" className="flex items-center shrink-0 ">
        <Image
          src={logo}
          alt={"logo Plushka"}
          loader={datoCMSImageLoader}
          className={styles.imageContainerSize}
        />
      </Link>
      <div className="flex grow gap-3 max-w-sm md:hidden ">
        <div className={`grow ${styles.searchContainer}`}>
          <MainInput
            AdormentEnd={<SearchIcon />}
            value={search}
            onChange={handleChange}
            aria-label="Search"
          />
          <div className={`relative ${styles.listContainer} `}>
            <List className="absolute ease-in duration-100 rounded overflow-auto box-shadow max-h-60 top-0 inset-x-0 z-20 bg-white">
              {filtered.map((product) => {
                return (
                  <HintListItem
                    product={product}
                    key={product.id}
                    onClick={() => handleGoToProduct(product.name)}
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
          categories={treeCategories}
          isOpen={isMobileNavigationOpen}
          onClose={handleClose}
        />
      </div>
      <div className="flex hidden grow md:flex">
        <div className="flex flex-col w-full">
          <div className="flex items-start justify-between">
            <div className="flex overflow-hidden w-10/12  lg:w-10/12 ">
              <Image src={crochetImage} alt="crochet" width={91} height={73} />
              <div
                className="grow border-b border-black self-end text-center leading-10 text-lg"
                style={{
                  marginBottom: "1.6px",
                  marginLeft: "-1px",
                  marginRight: "-1px",
                  filter: "blur(.6px)",
                }}
              >
                Życie jest zbyt krótkie by otaczać się masówką. Postaw na
                Handmade!
              </div>
              <Image
                src={crochetReverse}
                alt="crochet"
                width={91}
                height={73}
              />
            </div>
            <FavouriteButton />
          </div>
          <div className="w-full flex">
            <Navigation categories={treeCategories} />
          </div>
          <div
            className={`${styles.searchContainer} grow w-1/2 ml-auto max-w-sm`}
          >
            <MainInput
              className=""
              AdormentEnd={<SearchIcon />}
              value={search}
              onChange={handleChange}
            />
            <div className={`relative ${styles.listContainer} `}>
              <List className="absolute ease-in duration-100 rounded overflow-auto box-shadow max-h-60 top-0 inset-x-0 z-20 bg-white">
                {filtered.map((product) => {
                  return (
                    <HintListItem
                      product={product}
                      key={product.id}
                      onClick={() => handleGoToProduct(product.name)}
                    />
                  );
                })}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
