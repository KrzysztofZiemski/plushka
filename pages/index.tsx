import { GetStaticProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import MainLayout from "../components/layout/MainLayout";
import ProductListItem from "../components/molecules/ProductListItem";
import { Category } from "../types/category";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import { getTreeCategories } from "../utils/category";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function HomePage({ products, categories }: Props) {
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
  const categories = await getCategories();

  return {
    props: { products, categories },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <MainLayout products={pageProps.products} categories={pageProps.categories}>
    {page}
  </MainLayout>
);

HomePage.getLayout = getLayout;
