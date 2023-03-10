import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import client from "../config/apollo";
import ContextProviders from "../context";
import { NextPage } from "next";
import { useVH } from "../hooks/useVH";
import "../styles/globals.css";
import { GetLayout } from "../types/page";
import CookiesBanner from "../components/layout/CookiesBanner";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useVH();

  return (
    <ApolloProvider client={client}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA || ""}
        scriptProps={{
          async: true,
        }}
      >
        <ContextProviders>
          <Head>
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
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta property="og:locale" content="pl_PL" />
            <meta property="og:type" content="website" />
          </Head>
          <CookiesBanner />
          {getLayout(<Component {...pageProps} />, pageProps)}
          <ToastContainer />
        </ContextProviders>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
}
