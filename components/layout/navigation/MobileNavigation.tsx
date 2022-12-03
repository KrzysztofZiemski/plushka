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
      className={`fixed inset-0 bg-white overflow-hidden ease-out duration-300 ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <Image
        src={logo}
        alt={"logo Plushka"}
        loader={datoCMSImageLoader}
        className="h-28 w-auto ml-6 mb-12 my-5"
      />
      <CloseButton
        className="absolute ml-auto bg-transparent top-3.5 right-0"
        aria-label="close menu"
        onClick={onClose}
      />

      <List className="flex flex-col px-2 my-5 w-full justify-center">
        {listRoutes.map(({ label, path }) => (
          <ListElement
            key={path}
            style={{ marginRight: "2%", marginLeft: "2%" }}
          >
            <Link
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
