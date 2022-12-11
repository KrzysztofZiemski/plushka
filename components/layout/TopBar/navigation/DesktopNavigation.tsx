import Link from "next/link";
import React, { useMemo } from "react";
import Image from "next/image";
import { CategoryWitchChildren } from "../../../../types/category";
import { getPath } from "../../../../utils/routing";
import List from "../../../atom/list/List";
import ListElement from "../../../atom/list/ListElement";
import { findInfiniteChildrenIsActive } from "./helpers";
import crochetImage from "../../../../assets/crochet.png";
import FavouriteButton from "../../../atom/favouriteButton/FavouriteButton";
import { useFavourites } from "../../../../context/favourites";

interface Props {
  categories: CategoryWitchChildren[];
  path: string;
  goToFavourites: () => void;
}

export default function DesktopNavigation({
  categories,
  path,
  goToFavourites,
}: Props) {
  const { favourites } = useFavourites();

  const activeIndexCategory = useMemo(() => {
    return categories.findIndex((item) => {
      return findInfiniteChildrenIsActive(item, path);
    });
  }, [categories, path]);

  return (
    <div className="">
      <div className="flex w-full">
        <div className="shrink-0 flex">
          <Image
            className="mt-auto opacity-50"
            src={crochetImage}
            alt="crochet"
            width={60.66}
            height={48.66}
          />
        </div>
        <div
          className="grow border-b border-black self-end text-center leading-10 text-lg"
          style={{
            marginBottom: "1px",
            marginLeft: "-1px",
            marginRight: "-1px",
            borderColor: "#0000004A",
          }}
        >
          <List className="flex px-2 w-full">
            {categories.map((item, index) => {
              const isActive = index === activeIndexCategory;

              return (
                <ListElement
                  key={item.id}
                  style={{ marginRight: "5%", marginLeft: "5%" }}
                  className="flex items-end"
                >
                  <Link
                    href={getPath("category")(item.slugCategory)}
                    className={` ${
                      isActive ? "text-primary" : ""
                    } font-semibold ease-out hover:text-primary whitespace-nowrap shrink text-lg`}
                  >
                    {item.name}
                  </Link>
                </ListElement>
              );
            })}
            <ListElement className="ml-auto">
              <FavouriteButton
                onClick={goToFavourites}
                count={favourites.length}
              />
            </ListElement>
          </List>
        </div>
      </div>
      <div className="grow">
        {activeIndexCategory >= 0 && (
          <List className="flex p-2 w-full pl-9">
            {categories[activeIndexCategory].childrens.map((item, index) => {
              const isActive = findInfiniteChildrenIsActive(
                item as CategoryWitchChildren,
                path
              );

              return (
                <ListElement key={item.id} className="relative px-10 py-1">
                  <Link
                    href={getPath("category")(item.slugCategory)}
                    className={` ${
                      isActive ? "text-primary" : ""
                    } text-base m font-semibold ease-out hover:text-primary whitespace-nowrap shrink-0`}
                  >
                    {item.name}
                  </Link>
                </ListElement>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
}
