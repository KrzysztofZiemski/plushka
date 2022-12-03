import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import slugify from "slugify";
import { getProducts } from "../api/products";
import ProductListItem from "../components/molecules/ProductListItem";
import { Product, ProductCategory } from "../types/product";
import { categoriesSlugs } from "../utils/routing";

interface Props {
  products: Product[];
}

export default function CategoryPage({ products }: Props) {
  const router = useRouter();
  const { slugCategory } = router.query;

  const category = useMemo(
    () => categoriesSlugs[slugCategory as ProductCategory],
    [slugCategory]
  );

  const categoryProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((product) => product.category === category);
  }, [category, products]);

  return (
    <>
      <Head>
        <title>
          Plushka - {categoriesSlugs[category as ProductCategory] || ""}
        </title>
        <meta
          name="description"
          content="Rękodzieło z pasją. Przytulanki, zabawki, biżuteria."
        />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {categoryProducts.map((item) => (
          <ProductListItem key={item.id} item={item} />
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

  const paths = Object.values(ProductCategory).map((value) => ({
    params: { slugCategory: slugify(value) },
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
