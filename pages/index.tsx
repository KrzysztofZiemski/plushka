import { GetStaticProps } from "next";
import Head from "next/head";
import { getProducts } from "../api/products";
import { Product } from "../types/product";
import Image from "next/image";
import { datoCMSImageLoader } from "../utils/next";
import ProductListItem from "../components/molecules/ProductListItem";

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
      <div>
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
