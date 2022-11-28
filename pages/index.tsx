import { GetStaticProps } from "next";
import Head from "next/head";
import { getProducts } from "../api/products";
import { Product } from "../types/product";
import Image from "next/image";
import { datoCMSImageLoader } from "../utils/next";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  console.log(products);
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

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
  };
};
