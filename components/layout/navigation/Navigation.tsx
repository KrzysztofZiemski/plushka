import Link from "next/link";
import { useRouter } from "next/router";
import { CategoryWitchChildren } from "../../../types/category";
import { getPath } from "../../../utils/routing";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";
import { findInfiniteChildrenIsActive } from "./helpers";

interface Props {
  categories: CategoryWitchChildren[];
}
export default function Navigation({ categories }: Props) {
  const router = useRouter();
  return (
    <List className="flex px-2 my-5 w-full justify-center">
      {categories.map((item) => {
        const path = getPath("category")(item.slugCategory);
        const isActive = findInfiniteChildrenIsActive(item, router.asPath);

        return (
          <ListElement
            key={item.id}
            style={{ marginRight: "2%", marginLeft: "2%" }}
          >
            <Link
              href={path}
              className={` ${
                isActive ? "text-primary" : ""
              } text-base m font-semibold ease-out hover:text-primary whitespace-nowrap shrink lg:text-lg`}
            >
              {item.name}
            </Link>
          </ListElement>
        );
      })}
    </List>
  );
}
