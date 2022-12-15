import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import { ExpandedIcon } from "../../../../assets/icons";
import { Category } from "../../../../types/category";
import { getPath } from "../../../../utils/routing";
import Accordion from "../../../atom/accordion/Accordion";
import TextButton from "../../../atom/button/textButton";
import List from "../../../atom/list/List";
import ListElement from "../../../atom/list/ListElement";
import { findInfiniteChildrenIsActive } from "./helpers";

interface Props extends HTMLAttributes<HTMLLIElement> {
  category: Category;
  onCloseNavigation: () => void;
  asPath: string;
}
export default function MobileNavigationElement({
  category,
  style,
  onCloseNavigation,
  asPath,
  ...props
}: Props) {
  const isNested = !!category.categories?.length;
  const isActive = findInfiniteChildrenIsActive(category, asPath);

  const [isOpen, setIsOpen] = useState(isActive);

  const path = getPath("category")(category.slug);

  return (
    <ListElement className="px-0 ml-2" {...props}>
      <div className="flex items-center justify-between w-full border-b  px-2">
        <Link
          onClick={onCloseNavigation}
          href={path}
          className={`${
            isActive ? "text-primary" : ""
          } text-lg py-2 grow font-semibold ease-out duration-100 hover:text-primary whitespace-nowrap shrink lg:text-lg`}
        >
          {category.categoryName}
        </Link>
        {isNested && (
          <TextButton onClick={() => setIsOpen((prev) => !prev)}>
            <ExpandedIcon
              className={`transition-all ${isOpen ? "rotate-180" : ""}`}
            />
          </TextButton>
        )}
      </div>

      {isNested && (
        <Accordion isOpen={isOpen}>
          <List
            className={`ml-2 p-0 transition ease-linear overflow-hidden ${
              isOpen ? "" : ""
            }`}
          >
            {category.categories?.map((nestedCategory) => (
              <MobileNavigationElement
                asPath={asPath}
                key={nestedCategory.id}
                category={nestedCategory}
                onCloseNavigation={onCloseNavigation}
              />
            ))}
          </List>
        </Accordion>
      )}
    </ListElement>
  );
}
