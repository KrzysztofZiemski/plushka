import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getProducts } from "../api/products";
import { Product } from "../types/product";
import Image from "next/image";
import { datoCMSImageLoader } from "../utils/next";
import slugify from "slugify";

interface Props {
  products: Product[];
}

export default function CategoryPage({ products }: Props) {
  return (
    <>
      <Head>
        <title>Plushka</title>
        <meta
          name="description"
          content="Rękodzieło z pasją. Przytulanki, zabawki, biżuteria."
        />
      </Head>
      <div style={{ height: 400, position: "relative" }}>
        {products.map((el) => (
          <div key={el.id}>
            <div
              style={{
                position: "relative",
                height: "400px",
              }}
            >
              {el.photos.map((photo) => (
                <Image
                  loader={datoCMSImageLoader}
                  fill
                  key={photo.id}
                  src={photo.url}
                  alt={photo.alt}
                  style={{ objectFit: "contain" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();

  const categories: Record<string, string> = {};
  products.forEach((el) => {
    categories[el.category] = el.category;
  });

  return {
    paths: Object.entries(categories).map((entry) => ({
      params: { id: entry[0] },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category;

  const products = category ? await getProducts(category as string) : [];
  return {
    props: { products },
  };
};
