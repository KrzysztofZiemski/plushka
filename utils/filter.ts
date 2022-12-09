import { Product } from "../types/product";

export const productFilter = (item: Product, phrase: string) => {
  const { categories, name, shortDescription } = item;
  let points = 0;
  const searchWords = phrase.toLocaleLowerCase().trim().split(" ");
  if (name.includes(phrase)) return 50;

  searchWords.forEach((word) => {
    if (name.toLocaleLowerCase().includes(word)) points = +4;
    if (categories.map((cat) => cat.name.toLocaleLowerCase()).includes(word))
      points = +2;
    if (shortDescription.toLocaleLowerCase().includes(word)) points = +1;
  });

  return points;
};
