import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Category } from "../../types/category";
import { Product } from "../../types/product";
import Loader from "../atom/loader/Loader";
import Footer from "./footer/Footer";
import TopBar from "./TopBar/TopBar";

interface Props {
  children: ReactNode;
  categories: Category[];
  products: Product[];
}
export default function DetailsProductLayout({
  children,
  categories,
  products,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  router.events?.on("routeChangeStart", () => {
    setIsLoading(true);
  });
  router.events?.on("routeChangeComplete", () => {
    setIsLoading(false);
  });
  router.events?.on("routeChangeError", () => {
    setIsLoading(false);
  });
  return (
    <div className="min-h-screen pb-3 flex flex-col">
      <TopBar categories={categories} products={products} />
      <main className="w-full max-w-6xl grow md:px-4 xl:mx-auto mb-10">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
      <Footer categories={categories} />
    </div>
  );
}
