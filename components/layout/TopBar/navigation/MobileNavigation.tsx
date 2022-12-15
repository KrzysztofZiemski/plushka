import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import logo from "../../../../assets/logo.png";
import { useFavourites } from "../../../../context/favourites";
import useStopScrolling from "../../../../hooks/useStopScrolling";
import { Category } from "../../../../types/category";
import { datoCMSImageLoader } from "../../../../utils/next";
import { getPath } from "../../../../utils/routing";
import CloseButton from "../../../atom/button/closeButton";
import FavouriteButton from "../../../atom/favouriteButton/FavouriteButton";
import List from "../../../atom/list/List";
import MobileNavigationElement from "./MobileNavigationElement";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}
export default function MobileNavigation({
  isOpen,
  onClose,
  categories,
}: Props) {
  const router = useRouter();
  const { favourites } = useFavourites();
  const { setStopped } = useStopScrolling(isOpen);

  useEffect(() => {
    setStopped(isOpen);
  }, [isOpen, setStopped]);

  const goToFavourites = () => {
    router.push(getPath("favourites")(""));
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white overflow-hidden ease-out duration-300 z-10 ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <div className="flex p-2">
        <Image
          src={logo}
          alt="logo Plushka"
          loader={datoCMSImageLoader}
          className="h-14 w-auto "
        />
        <CloseButton
          className="ml-auto bg-transparent top-3.5 right-3"
          aria-label="close menu"
          onClick={onClose}
        />
      </div>
      <div className="text-right px-2">
        <FavouriteButton
          onClick={goToFavourites}
          count={favourites.length}
          role="link"
          aria-label={"ulubione"}
        />
      </div>

      <List className="flex flex-col px-2  w-full justify-center overflow-auto">
        {categories.map((category) => (
          <MobileNavigationElement
            asPath={router.asPath}
            category={category}
            onCloseNavigation={onClose}
            key={category.id}
          />
        ))}
      </List>
    </div>
  );
}
