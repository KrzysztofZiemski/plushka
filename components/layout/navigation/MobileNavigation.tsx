import Link from "next/link";
import React from "react";
import { datoCMSImageLoader } from "../../../utils/next";
import CloseButton from "../../atom/button/closeButton";
import List from "../../atom/list/List";
import Image from "next/image";
import ListElement from "../../atom/list/ListElement";
import { listRoutes } from "./helpers";
import logo from "../../../assets/logo.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function MobileNavigation({ isOpen, onClose }: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white overflow-hidden ease-out duration-300 ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <CloseButton
        className="absolute ml-auto bg-transparent top-3.5 right-0"
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
        {listRoutes.map(({ label, path }) => (
          <ListElement
            key={path}
            style={{ marginRight: "2%", marginLeft: "2%" }}
          >
            <Link
              onClick={onClose}
              href={path}
              className="text-lg m font-semibold ease-out duration-100 hover:text-primary whitespace-nowrap shrink lg:text-lg"
            >
              {label}
            </Link>
          </ListElement>
        ))}
      </List>
    </div>
  );
}
