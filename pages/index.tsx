import { GetStaticProps } from "next";
import Head from "next/head";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import MainLayout from "../components/layout/MainLayout";
import ProductListItem from "../components/molecules/ProductListItem";
import { useFavourites } from "../context/favourites";
import { Category } from "../types/category";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function HomePage({ products, categories }: Props) {
  const { favourites, toggle } = useFavourites();
  const router = useRouter();

  const description = "Rękodzieło z pasją. Przytulanki, zabawki, biżuteria. ";

  return (
    <>
      <Head>
        <title>Plushka - rękodzieło z pasją.</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Plushka" />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {products.map((item) => (
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
