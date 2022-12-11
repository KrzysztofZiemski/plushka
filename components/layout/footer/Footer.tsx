import Link from "next/link";
import React from "react";
import {
  AllegroIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../assets/icons";
import { Category } from "../../../types/category";
import { getPath } from "../../../utils/routing";
import TextButton from "../../atom/button/textButton";
import List from "../../atom/list/List";
import ListElement from "../../atom/list/ListElement";

interface Props {
  categories: Category[];
}
export default function Footer({ categories }: Props) {
  return (
    <footer className="flex bg-dark-background text-white p-16 place-content-center">
      <div>
        <h3 className="font-medium md:text-lg mb-8 mx-2 uppercase">Plishka</h3>
        <List>
          {categories
            // .filter(({ parent }) => !parent)
            .map(({ id, slugCategory, name }) => (
              <ListElement key={id}>
                <Link href={getPath("category")(slugCategory)}>{name}</Link>
              </ListElement>
            ))}
        </List>
      </div>
      <div
        className="w-px bg-white"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      ></div>
      <div>
        <h3 className="font-medium md:text-lg mb-8 mx-2 uppercase">
          Można mnie znaleźć
        </h3>
        <List className="flex gap-4 flex-wrap">
          <ListElement>
            <a
              href="https://www.facebook.com/paula.z.handmade/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
          </ListElement>
          <ListElement>
            <a
              href="https://www.instagram.com/plushka_hand.made/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
          </ListElement>

          <ListElement>
            <a
              href="https://allegro.pl/uzytkownik/zvierzu?fbclid=IwAR2EF3oCZA3NtJLCuqfhJQDJBQ1gLar4JEcaqHneqKVk4ddiy6P1Rsnih3A"
              target="_blank"
              rel="noreferrer"
            >
              <AllegroIcon />
            </a>
          </ListElement>
        </List>
      </div>
    </footer>
  );
}
