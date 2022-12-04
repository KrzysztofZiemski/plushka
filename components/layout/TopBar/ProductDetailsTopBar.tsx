import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import crochetReverse from "../../../assets/crochet-reverse.png";
import crochetImage from "../../../assets/crochet.png";
import { MenuBurgerIcon } from "../../../assets/icons";
import logo from "../../../assets/logo.png";
import { datoCMSImageLoader } from "../../../utils/next";
import TextButton from "../../atom/button/textButton";
import FavouriteButton from "../../atom/favouriteButton/FavouriteButton";
import MobileNavigation from "../navigation/MobileNavigation";
import styles from "./topBar.module.css";

export default function MainTopBar() {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  const handleToggleMenu = () => setIsMobileNavigationOpen((prev) => !prev);

  const handleClose = useCallback(
    () => setIsMobileNavigationOpen(false),
    [setIsMobileNavigationOpen]
  );
  return (
    <div className="main-shadow w-full flex items-center justify-between gap-3 px-2 py-2 md:items-stretch sticky bg-white z-10 top-0 md:px-6 md:py-6 md:shadow-none md:static">
      <div className="flex justify-between w-full gap-3 md:hidden">
        <Link href="/" className="flex items-center shrink-0 ">
          <Image
            src={logo}
            alt={"logo Plushka"}
            loader={datoCMSImageLoader}
            className={styles.imageContainerSize}
          />
        </Link>

        <TextButton
          onClick={handleToggleMenu}
          className="p-0"
          role="button"
          aria-label="Open navigation page"
        >
          <MenuBurgerIcon />
        </TextButton>
        <MobileNavigation
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
        </div>
      </div>
    </div>
  );
}
