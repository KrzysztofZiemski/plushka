import { categoriesSlugs, getPath } from "../../../utils/routing";

export const listRoutes = [
  {
    path: getPath("category")(categoriesSlugs.biżuteria),
    label: "Biżuteria",
  },
  {
    path: getPath("category")(categoriesSlugs.maskotki),
    label: "Maskotki pluszowe",
  },
  {
    path: getPath("category")(categoriesSlugs.chusty),
    label: "Chusty",
  },
];
