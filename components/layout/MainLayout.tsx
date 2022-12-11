import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Category } from "../../types/category";
import { Product } from "../../types/product";
import Loader from "../atom/loader/Loader";
import Footer from "./footer/Footer";
import TopBar from "./TopBar/TopBar";

interface Props {
  products: Product[];
  categories: Category[];
  isLoading?: boolean;
  children: ReactNode;
}
export default function MainLayout({ products, children, categories }: Props) {
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
    <div className="min-h-screen flex flex-col">
      <TopBar products={products || []} categories={categories} />
      <main className="w-full max-w-6xl grow md:mx-4 xl:mx-auto mb-10">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
      <Footer categories={categories} />
    </div>
  );
}
//max-w-6xl	max-width: 72rem; /* 1152px */re
