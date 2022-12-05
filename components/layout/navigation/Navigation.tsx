import Link from "next/link";
import { CategoryWitchChildren } from "../../../types/category";
import { getPath } from "../../../utils/routing";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";

interface Props {
  categories: CategoryWitchChildren[];
}
export default function Navigation({ categories }: Props) {
  return (
    <List className="flex px-2 my-5 w-full justify-center">
      {categories.map(({ name, id, slugCategory }) => (
        <ListElement key={id} style={{ marginRight: "2%", marginLeft: "2%" }}>
          <Link
            href={getPath("category")(slugCategory)}
            className="text-base m font-semibold ease-out hover:text-primary whitespace-nowrap shrink lg:text-lg"
          >
            {name}
          </Link>
        </ListElement>
      ))}
    </List>
  );
}
