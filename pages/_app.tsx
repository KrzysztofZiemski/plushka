import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import client from "../config/apollo";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div>
        <main>
          <Component {...pageProps} />
        </main>
        <footer className="text-3xl text-green-600 p-2">footer</footer>
      </div>
    </ApolloProvider>
  );
}
