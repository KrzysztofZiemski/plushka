import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProduct, getProducts } from "../../api/products";
import MainButton from "../../components/atom/button/MainButton";
import List from "../../components/atom/list/List";
import DetailsProductLayout from "../../components/layout/DetailsProductLayout";
import Markdown from "../../components/molecules/markdown/Markdown";
import { GetLayout } from "../../types/page";
import { Product } from "../../types/product";
import { datoCMSImageLoader } from "../../utils/next";

interface Props {
  product: Product;
}

export default function ProductDetailPage({
  product: {
    name,
    shortDescription,
    textDescription,
    productColors,
    price,
    id,
    category,
    photos,
  },
}: Props) {
  const [selected, setSelected] = useState(0);

  const selectedPhoto = photos[selected];
  return (
    <div>
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
        <List className="flex flex-wrap gap-2 p-2">
          {photos?.map(({ id, alt, url }, index) => (
            <div
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
            </div>
          ))}
        </List>
      </div>
      <div className="px-4">
        <div className="flex items-center justify-between mb-4 ">
          <h1 className="capitalize font-bold text-xl">{name}</h1>
          <p className="font-medium text-lg">{price} zł</p>
        </div>
        <Markdown text={textDescription} className="mb-4" />
        <MainButton className="mb-6">Wyślij zapytanie o product</MainButton>
      </div>
    </div>
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
  return {
    props: { product },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <DetailsProductLayout>{page}</DetailsProductLayout>
);

ProductDetailPage.getLayout = getLayout;
