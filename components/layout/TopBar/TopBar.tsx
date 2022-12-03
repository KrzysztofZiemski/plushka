import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useMemo } from "react";
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
import ListElement from "../../atom/list/ListElement";
import FavouriteButton from "../components/FavouriteButton";
import HintListItem from "../components/HintListItem";
import Navigation from "../navigation/Navigation";
import styles from "./topBar.module.css";

interface Props {
  products: Product[];
}
export default function TopBar({ products }: Props) {
  const handleToggleMenu = () => {};
  const { search, setSearch } = useSearch();

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
                return <HintListItem product={product} key={product.id} />;
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
            <Navigation />
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
                  return <HintListItem product={product} key={product.id} />;
                })}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
