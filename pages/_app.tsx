import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import TopBar from "../components/layout/TopBar/TopBar";

import client from "../config/apollo";
import { SearchProvider } from "../context/search";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps);
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div>
          <TopBar products={pageProps.products || []} />
          <main className="max-w-6xl mx-auto">
            <Component {...pageProps} />
          </main>
          {/* <footer className="text-3xl text-green-600 p-2">footer</footer> */}
        </div>
      </SearchProvider>
    </ApolloProvider>
  );
}
