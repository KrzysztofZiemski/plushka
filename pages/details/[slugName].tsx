import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useState } from "react";
import { getCategories } from "../../api/categories";
import { getProduct, getProducts } from "../../api/products";
import BottomProduct from "../../components/atom/bottomProduct/BottomProduct";
import List from "../../components/atom/list/List";
import DetailsProductLayout from "../../components/layout/DetailsProductLayout";
import Markdown from "../../components/molecules/markdown/Markdown";
import { useFavourites } from "../../context/favourites";
import { Category } from "../../types/category";
import { GetLayout } from "../../types/page";
import { Product } from "../../types/product";
import { Amount } from "../../utils/amount";
import { datoCMSImageLoader } from "../../utils/next";

interface Props {
  product: Product;
  categories: Category[];
  products: Product[];
}

export default function ProductDetailPage({ product }: Props) {
  const {
    name,
    shortDescription,
    textDescription,
    price,
    photos,
    productColors,
    id,
  } = product;

  const [selected, setSelected] = useState(0);
  const { toggle, favourites } = useFavourites();

  const handleToggleFavourite = useCallback(
    () => toggle(product),
    [product, toggle]
  );

  const selectedPhoto = photos[selected];
  return (
    <>
      <Head>
        <title>{`${name}`}</title>
        <meta name="description" content={shortDescription} />
      </Head>
      <div className="mb-2">
        <div className="p-2 border-2">
          <div className="relative w-full h-96 md:half-screen-height">
            <Image
              loader={datoCMSImageLoader}
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <List className="flex flex-wrap gap-2 p-2 justify-center">
          {photos?.map(({ id, alt, url }, index) => (
            <li
              className={`relative w-16 h-16 cursor-poiner border-2 ${
                index === selected ? "border-primary" : ""
              }`}
              key={id}
              onClick={() => setSelected(index)}
            >
              <Image
                className="object-cover"
                fill
                src={url}
                alt={alt}
                loader={datoCMSImageLoader}
              />
            </li>
          ))}
        </List>
      </div>
      <div className="px-4 grow">
        <div className="flex items-center justify-between mb-4 ">
          <h1 className="capitalize font-bold text-xl">{name}</h1>
          <p className="font-medium text-lg">
            {new Amount(price, "PLN").price}
          </p>
        </div>
        <Markdown text={textDescription} className="mb-4" />
      </div>
      <BottomProduct
        colors={productColors}
        className="mt-auto py-4  mt-auto"
        toggleFavourite={handleToggleFavourite}
        isFavourite={!!favourites.find(({ idProduct }) => idProduct === id)}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();

  const paths = products.map((el) => ({
    params: { slugName: el.slugName },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slugName)
    return {
      props: { product: null },
      notFound: true,
    };

  const product = await getProduct(params.slugName as string);
  const products = await getProducts();
  const categories = await getCategories();
  return {
    props: { product, categories, products },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <DetailsProductLayout
    categories={pageProps.categories}
    products={pageProps.products}
  >
    {page}
  </DetailsProductLayout>
);

ProductDetailPage.getLayout = getLayout;
