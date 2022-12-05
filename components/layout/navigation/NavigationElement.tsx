import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { CategoryWitchChildren } from "../../../types/category";
import { getPath } from "../../../utils/routing";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";

interface Props extends HTMLAttributes<HTMLLIElement> {
  category: CategoryWitchChildren;
  onCloseNavigation: () => void;
}
export default function NavigationElement({
  category,
  style,
  onCloseNavigation,
  ...props
}: Props) {
  const isNested = !!category.childrens.length;
  return (
    <ListElement
      style={{ marginRight: "2%", marginLeft: "2%", ...style }}
      {...props}
    >
      <Link
        onClick={onCloseNavigation}
        href={getPath("category")(category.slugCategory)}
        className="text-lg m font-semibold ease-out duration-100 hover:text-primary whitespace-nowrap shrink lg:text-lg"
      >
        {category.name}
      </Link>
      {isNested && (
        <List>
          {category.childrens.map((nestedCategory) => (
            <NavigationElement
              key={nestedCategory.id}
              category={nestedCategory as CategoryWitchChildren}
              onCloseNavigation={onCloseNavigation}
            />
          ))}
        </List>
      )}
    </ListElement>
  );
}
