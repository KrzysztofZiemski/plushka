import { GetStaticProps } from "next";
import Head from "next/head";
import { getProducts } from "../api/products";
import { Product } from "../types/product";
import ProductListItem from "../components/molecules/ProductListItem";
import { useSearch } from "../context/search";
import { useMemo } from "react";
import { productFilter } from "../utils/filter";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  const { search } = useSearch();

  const filtered = useMemo(() => {
    if (search.length < 3) return products;
    return products
      .map((el) => ({ ...el, points: productFilter(el, search) }))
      .filter(({ points }) => points)
      .sort((a, b) => b.points - a.points);
  }, [search, products]);

  return (
    <>
      <Head>
        <title>Plushka</title>
        <meta
          name="description"
          content="Rękodzieło z pasją. Przytulanki, zabawki, biżuteria."
        />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProductListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: { products },
  };
};
