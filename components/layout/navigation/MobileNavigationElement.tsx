import Link from "next/link";
import React, { HTMLAttributes, useState } from "react";
import { ExpandedIcon } from "../../../assets/icons";
import { CategoryWitchChildren } from "../../../types/category";
import { getPath } from "../../../utils/routing";
import Accordion from "../../atom/accordion/Accordion";
import TextButton from "../../atom/button/textButton";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";

interface Props extends HTMLAttributes<HTMLLIElement> {
  category: CategoryWitchChildren;
  onCloseNavigation: () => void;
}
export default function MobileNavigationElement({
  category,
  style,
  onCloseNavigation,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isNested = !!category.childrens.length;
  return (
    <ListElement className="px-0 ml-2" {...props}>
      <div className="flex items-center justify-between w-full border-b  px-2">
        <Link
          onClick={onCloseNavigation}
          href={getPath("category")(category.slugCategory)}
          className="text-lg py-2 grow font-semibold ease-out duration-100 hover:text-primary whitespace-nowrap shrink lg:text-lg"
        >
          {category.name}
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
            {category.childrens.map((nestedCategory) => (
              <MobileNavigationElement
                key={nestedCategory.id}
                category={nestedCategory as CategoryWitchChildren}
                onCloseNavigation={onCloseNavigation}
              />
            ))}
          </List>
        </Accordion>
      )}
    </ListElement>
  );
}
