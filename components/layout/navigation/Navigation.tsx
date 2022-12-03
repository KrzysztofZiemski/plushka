import Link from "next/link";
import React from "react";
import { getPath } from "../../../utils/routing";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";
import { listRoutes } from "./helpers";




export default function Navigation() {
  return (
    <List className="flex px-2 my-5 w-full justify-center">
      {listRoutes.map(({ label, path }) => (
        <ListElement key={path} style={{ marginRight: "2%", marginLeft: "2%" }}>
          <Link
            href={path}
            className="text-base m font-semibold ease-out hover:text-primary whitespace-nowrap shrink lg:text-lg"
          >
            {label}
          </Link>
        </ListElement>
      ))}
    </List>
  );
}
