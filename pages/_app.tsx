import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookiesBanner from "../components/layout/CookiesBanner";
import client from "../config/apollo";
import ContextProviders from "../context";
import { useVH } from "../hooks/useVH";
import "../styles/globals.css";
import { GetLayout } from "../types/page";
import logo from "../assets/logo.png";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useVH();

  const description =
    "Rękodzieło z pasją. Ręcznie robione przytulanki, biżuteria, chusty. Wszystkie wyroby są trwałe oraz wysokiej jakości. Specjalne wzory na zamówienie.";

  return (
    <ApolloProvider client={client}>
      <ContextProviders>
        <Head>
          <meta
            name="keywords"
            content="rękodzieło, handmade, bizuteria, maskotki, zabawki, dziecko, pomysł na prezent, ręcznie robione"
          />
          <title>Plushka - rękodzieło z pasją.</title>
          <meta name="description" content={description} />
          <meta property="og:title" content="Plushka - Rękodzieło z pasją" />
          <meta property="og:image" content={logo.src} />
          <meta property="og:description" content={description} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/meta/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/meta/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/meta/favicon-16x16.png"
          />
          <link rel="manifest" href="/meta/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:locale" content="pl_PL" />
          <meta property="og:type" content="website" />
        </Head>
        <CookiesBanner />

        {getLayout(<Component {...pageProps} />, pageProps)}
        <ToastContainer />
      </ContextProviders>
    </ApolloProvider>
  );
}
