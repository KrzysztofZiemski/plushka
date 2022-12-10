import Image from "next/image";
import crochetReverse from "../../../assets/crochet-reverse.png";
import crochetImage from "../../../assets/crochet.png";
import { SearchIcon } from "../../../assets/icons";
import useSearchProducts from "../../../hooks/useSearchProducts";
import { CategoryWitchChildren } from "../../../types/category";
import { Product } from "../../../types/product";
import FavouriteButton from "../../atom/favouriteButton/FavouriteButton";
import MainInput from "../../atom/input/MainInput";
import List from "../../atom/list/List";
import HintListItem from "../../molecules/HintListItem";
import Navigation from "./navigation/Navigation";
import styles from "./topBar.module.css";

interface Props {
  products: Product[];
  categories: CategoryWitchChildren[];
  goToProduct: (productName: string) => void;
}

export default function DesktopTopBar({
  categories,
  products,
  goToProduct,
}: Props) {
  const { search, setSearch, filtered } = useSearchProducts(products);

  return (
    <div className="w-full flex justify-between gap-3 px-2 py-2 mb-3 bg-white z-10 px-6 py-6  md:static">
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
            <Navigation categories={categories} />
          </div>
          <div
            className={`${styles.searchContainer} grow w-1/2 ml-auto max-w-sm`}
          >
            <MainInput
              className=""
              AdormentEnd={<SearchIcon />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={`relative ${styles.listContainer} `}>
              <List className="absolute ease-in duration-100 rounded overflow-auto box-shadow max-h-60 top-0 inset-x-0 z-20 bg-white">
                {filtered.map((product) => {
                  return (
                    <HintListItem
                      product={product}
                      key={product.id}
                      onClick={() => goToProduct(product.name)}
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
