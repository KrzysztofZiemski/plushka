import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import Loader from "../atom/loader/Loader";
import ProductDetailsTopBar from "./TopBar/ProductDetailsTopBar";

interface Props {
  children: ReactNode;
}
export default function DetailsProductLayout({ children }: Props) {
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
      <ProductDetailsTopBar />
      <main className="max-w-6xl mx-auto">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
    </div>
  );
}
