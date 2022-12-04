import { useRouter } from "next/router";
import React, { Component, ReactNode, useState } from "react";
import { Product } from "../../types/product";
import Loader from "../atom/loader/Loader";
import MainTopBar from "./TopBar/MainTopBar";

interface Props {
  products: Product[];
  isLoading?: boolean;
  children: ReactNode;
}
export default function MainLayout({ products, children }: Props) {
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
    <div className="min-h-screen mb-3">
      <MainTopBar products={products || []} />
      <main className="max-w-6xl mx-auto">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
    </div>
  );
}
