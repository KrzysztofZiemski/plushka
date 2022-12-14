import { GetStaticProps } from "next";
import Head from "next/head";
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

export default function HomePage({ products, categories }: Props) {
  const { favourites, toggle } = useFavourites();

  const description =
    "Rękodzieło z pasją. Ręcznie robione przytulanki, biżuteria, chusty. Wyroby gotowe jak i na zamówienie ";

  return (
    <>
      <Head>
        <title>Plushka - rękodzieło z pasją.</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Plushka - Rękodzieło z pasją" />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={description} />
      </Head>
      <PageTitle>Najnowsze</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {products.length === 0 && <p className="my-6 pl-2">Brak wyników</p>}
        {products.slice(0, 20).map((item) => (
          <ProductListItem
            toggleFavourite={toggle}
            key={item.id}
            item={item}
            isFavourite={!!favourites.find((fav) => fav.idProduct === item.id)}
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
    props: { products, categories },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <MainLayout products={pageProps.products} categories={pageProps.categories}>
    {page}
  </MainLayout>
);

HomePage.getLayout = getLayout;
