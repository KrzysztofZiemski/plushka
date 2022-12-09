import { useRouter } from "next/router";
import React, { Component, ReactNode, useState } from "react";
import { Category } from "../../types/category";
import { Product } from "../../types/product";
import Loader from "../atom/loader/Loader";
import MainTopBar from "./TopBar/MainTopBar";

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
    <div className="min-h-screen flex flex-col pb-3 ">
      <MainTopBar products={products || []} categories={categories} />
      <main className="max-w-6xl grow md:mx-4 xl:mx-auto">
        {isLoading ? <Loader className="mx-auto" /> : children}
      </main>
    </div>
  );
}
