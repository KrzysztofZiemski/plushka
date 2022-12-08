import Image from "next/image";
import logo from "../../../assets/logo.png";
import { CategoryWitchChildren } from "../../../types/category";
import { datoCMSImageLoader } from "../../../utils/next";
import CloseButton from "../../atom/button/closeButton";
import List from "../../atom/list/List";
import NavigationElement from "./NavigationElement";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryWitchChildren[];
}
export default function MobileNavigation({
  isOpen,
  onClose,
  categories,
}: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white overflow-hidden ease-out duration-300 ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <CloseButton
        className="absolute ml-auto bg-transparent top-3.5 right-3"
        aria-label="close menu"
        onClick={onClose}
      />

      <Image
        src={logo}
        alt={"logo Plushka"}
        loader={datoCMSImageLoader}
        className="h-28 w-auto ml-6 mb-12 my-5"
      />

      <List className="flex flex-col px-2 my-5 w-full justify-center overflow-auto">
        {categories.map((category) => (
          <NavigationElement
            category={category}
            onCloseNavigation={onClose}
            key={category.id}
          />
        ))}
      </List>
    </div>
  );
}
