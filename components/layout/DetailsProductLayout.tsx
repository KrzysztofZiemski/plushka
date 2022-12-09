import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Category } from "../../types/category";
import Loader from "../atom/loader/Loader";
import ProductDetailsTopBar from "./TopBar/ProductDetailsTopBar";

interface Props {
  children: ReactNode;
  categories: Category[];
}
export default function DetailsProductLayout({ children, categories }: Props) {
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
    <div className="min-h-screen">
      <ProductDetailsTopBar categories={categories} />
      <main className="max-w-6xl md:mx-4 xl:mx-auto">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
    </div>
  );
}
