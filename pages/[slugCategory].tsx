import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getProducts } from "../api/products";
import MainLayout from "../components/layout/MainLayout";
import ProductListItem from "../components/molecules/ProductListItem";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import { categoriesSlugs } from "../utils/routing";

interface Props {
  products: Product[];
}

export default function CategoryPage({ products }: Props) {
  const router = useRouter();
  const { slugCategory } = router.query;

  const categoryProducts = useMemo(() => {
    if (!slugCategory) return [];

    return products.filter((product) => product.slugCategory === slugCategory);
  }, [slugCategory, products]);

  return (
    <>
      <Head>
        <title>Plushka - {categoryProducts[0]?.category || ""}</title>
        <meta
          name="description"
          content="Rękodzieło z pasją. Przytulanki, zabawki, biżuteria."
        />
      </Head>
      <h1>{categoryProducts[0]?.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {categoryProducts.map((item) => (
          <ProductListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(categoriesSlugs).map((slugCategory) => ({
    params: { slugCategory: slugCategory },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products: products || [] },
  };
};

const getLayout: GetLayout = (page, pageProps: { products: Product[] }) => (
  <MainLayout products={pageProps.products}>{page}</MainLayout>
);

CategoryPage.getLayout = getLayout;
