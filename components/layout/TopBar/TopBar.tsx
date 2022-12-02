import React, { ChangeEvent } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import TextButton from "../../atom/button/textButton";
import MainInput from "../../atom/input/MainInput";
import { useSearch } from "../../../context/search";
import { MenuBurgerIcon, SearchIcon } from "../../../assets/icons";
import styles from "./topBar.module.css";
import FavouriteButton from "../components/FavouriteButton";
import crochetImage from "../../../assets/crochet.png";
import crochetReverse from "../../../assets/crochet-reverse.png";
import { transform } from "typescript";
import Navigation from "../navigation/Navigation";
export default function TopBar() {
  const handleToggleMenu = () => {};
  const { search, setSearch } = useSearch();
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  return (
    <div className="main-shadow w-full flex items-center justify-between overflow-hidden gap-3 px-2 py-2 mb-3 md:items-stretch sticky bg-white z-10 top-0 md:px-6 md:py-6">
      <Link href="/" className="flex items-center shrink-0 ">
        <Image
          src={logo}
          alt={"logo Plushka"}
          className={styles.imageContainerSize}
        />
      </Link>
      <div className="flex grow gap-3 max-w-sm md:hidden ">
        <MainInput
          className="grow "
          AdormentEnd={<SearchIcon />}
          value={search}
          onChange={handleChange}
        />
        <TextButton onClick={handleToggleMenu} className="p-0">
          <MenuBurgerIcon />
        </TextButton>
      </div>
      <div className="flex hidden grow md:flex overflow-hidden">
        <div className="flex flex-col w-full">
          <div className="flex items-start justify-between">
            <div className="flex overflow-hidden w-10/12 lg:w-10/12">
              <Image src={crochetImage} alt="crochet" width={91} height={73} />
              <div
                className="grow h-px bg-black self-end "
                style={{
                  marginBottom: "1.6px",
                  marginLeft: "-1px",
                  marginRight: "-1px",
                  filter: "blur(.6px)",
                }}
              ></div>
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
          <div>
            <MainInput
              className="grow w-1/2 ml-auto max-w-sm"
              AdormentEnd={<SearchIcon />}
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
