import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";

import client from "../config/apollo";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
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
        <main>
          <Component {...pageProps} />
        </main>
        <footer className="text-3xl text-green-600 p-2">footer</footer>
      </div>
    </ApolloProvider>
  );
}
