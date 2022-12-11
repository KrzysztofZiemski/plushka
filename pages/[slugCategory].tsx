import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import PageTitle from "../components/atom/pageTitle/pageTitle";
import MainLayout from "../components/layout/MainLayout";
import ProductListItem from "../components/molecules/ProductListItem";
import { useFavourites } from "../context/favourites";
import { Category } from "../types/category";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import logo from "../assets/logo.png";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function CategoryPage({ products, categories }: Props) {
  const router = useRouter();
  const { slugCategory } = router.query;
  const { favourites, toggle } = useFavourites();

  const pageCategory = useMemo(() => {
    return categories.find(
      (category) => category.slugCategory === slugCategory
    );
  }, [categories, slugCategory]);

  const categoryProducts = useMemo(() => {
    if (!slugCategory) return [];

    return products.filter(
      (product) =>
        !!product.categories.find(
          (category) => category.slugCategory === slugCategory
        )
    );
  }, [products, slugCategory]);

  const description = `${pageCategory?.name} | Rękodzieło z pasją. Przytulanki, zabawki, biżuteria.`;

  return (
    <>
      <Head>
        <title>{`Plushka - ${pageCategory?.name || ""}`}</title>

        <meta name="description" content={description} />
        <meta property="og:title" content={`Plushka - ${pageCategory?.name}`} />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={description} />
      </Head>
      <PageTitle>{pageCategory?.name}</PageTitle>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 ${
          categoryProducts.length < 3
            ? `grid-cols-${categoryProducts.length}!important`
            : ""
        }`}
      >
        {categoryProducts.map((item) => (
          <ProductListItem
            key={item.id}
            item={item}
            toggleFavourite={toggle}
            isFavourite={!!favourites.find((fav) => fav.idProduct === item.id)}
          />
        ))}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map(({ slugCategory }) => ({
    params: { slugCategory },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    props: { products: products || [], categories },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <MainLayout products={pageProps.products} categories={pageProps.categories}>
    {page}
  </MainLayout>
);

CategoryPage.getLayout = getLayout;
