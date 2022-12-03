import { getPath } from "../../../utils/routing";

export const listRoutes = [
  {
    path: getPath("category")("biżuteria"),
    label: "Biżuteria",
  },
  {
    path: getPath("category")("maskotki"),
    label: "Maskotki pluszowe",
  },
  {
    path: getPath("category")("chusty"),
    label: "Chusty",
  },
];
