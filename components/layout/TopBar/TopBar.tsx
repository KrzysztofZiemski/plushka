import React, { ChangeEvent } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import styles from "./styles.module.css";
import TextButton from "./atom/button/textButton";
import MainInput from "./atom/input/MainInput";
import { useSearch } from "../../../context/search";
import MenuBurgerIcon from "../../../assets/icons/menu-burger.svg";
import SearchIcon from "../../../assets/icons/search-icon.svg";

export default function TopBar() {
  const handleToggleMenu = () => {};
  const { search, setSearch } = useSearch();
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  return (
    <div
      className={`${styles.topShadow} flex items-center justify-between gap-3 px-4 py-2 `}
    >
      <Link href="/">
        <Image
          height={60}
          width={54}
          src={logo}
          alt={"logo Plushka"}
          style={{ objectFit: "contain" }}
        />
      </Link>
      <MainInput
        AdormentEnd={<SearchIcon />}
        value={search}
        onChange={handleChange}
      />
      <TextButton onClick={handleToggleMenu} className="p-0">
        <MenuBurgerIcon />
      </TextButton>
    </div>
  );
}
