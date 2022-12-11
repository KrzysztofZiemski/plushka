import Link from "next/link";
import React, { useMemo } from "react";
import { CategoryWitchChildren } from "../../../../types/category";
import { getPath } from "../../../../utils/routing";
import List from "../../../atom/list/List";
import ListElement from "../../../atom/list/ListElement";
import { findInfiniteChildrenIsActive } from "./helpers";
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
      <List className="flex w-full grow border-b border-black">
        {categories.map((item, index) => {
          const isActive = index === activeIndexCategory;
          return (
            <ListElement
              key={item.id}
              // style={{ marginRight: "5%", marginLeft: "5%" }}
              className="flex items-end mx-5"
            >
              <Link
                href={getPath("category")(item.slugCategory)}
                className={` ${
                  isActive ? "text-primary" : ""
                } font-semibold ease-out hover:text-primary whitespace-nowrap shrink text-lg  px-5 mb-2`}
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
            role="link"
            aria-label={"ulubione"}
          />
        </ListElement>
      </List>

      <div className="grow">
        {activeIndexCategory >= 0 && (
          <List className="flex  w-full gap-6">
            {categories[activeIndexCategory].childrens.map((item, index) => {
              const isActive = findInfiniteChildrenIsActive(
                item as CategoryWitchChildren,
                path
              );

              return (
                <ListElement key={item.id}>
                  <Link
                    href={getPath("category")(item.slugCategory)}
                    className={` ${
                      isActive ? "text-primary" : ""
                    } py-9 text-base font-semibold ease-out hover:text-primary whitespace-nowrap shrink-0`}
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
