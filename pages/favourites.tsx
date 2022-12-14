import { GetStaticProps } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import logo from "../assets/logo.png";
import PageTitle from "../components/atom/pageTitle/pageTitle";
import MainLayout from "../components/layout/MainLayout";
import ProductListItem from "../components/molecules/ProductListItem";
import { useFavourites } from "../context/favourites";
import { Category } from "../types/category";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function FavouritesPage({ products, categories }: Props) {
  const { favourites, toggle } = useFavourites();

  const favouriteProducts = useMemo(() => {
    return favourites
      .map((favouriteItem) =>
        products.find((product) => product.id === favouriteItem.idProduct)
      )
      .filter((item) => item !== undefined) as Product[];
  }, [favourites, products]);

  const description = "Rękodzieło z pasją. Przytulanki, zabawki, biżuteria. ";

  return (
    <>
      <Head>
        <title>Plushka - ulubione</title>

        <meta name="description" content={description} />
        <meta property="og:title" content="Plushka - Rękodzieło z pasją" />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={description} />
      </Head>
      <PageTitle>Ulubione</PageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {favouriteProducts.map((item) => (
          <ProductListItem
            key={item.id}
            item={item}
            toggleFavourite={toggle}
            isFavourite={true}
          />
        ))}
      </div>
    </>
  );
}

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

FavouritesPage.getLayout = getLayout;
