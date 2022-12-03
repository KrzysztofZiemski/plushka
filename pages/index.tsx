import { GetStaticProps } from "next";
import Head from "next/head";
import { getProducts } from "../api/products";
import ProductListItem from "../components/molecules/ProductListItem";
import { Product } from "../types/product";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
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
        {products.map((item) => (
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
