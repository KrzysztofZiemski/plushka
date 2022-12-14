import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isProduction } from "../utils/next";

const client = new ApolloClient({
  uri: process.env.DATO_CMS_URL,
  cache: new InMemoryCache(),
  headers: isProduction()
    ? {
        authorization: `Bearer ${process.env.DATO_CMS_API_KEY}`,
      }
    : {
        authorization: `Bearer ${process.env.DATO_CMS_API_KEY}`,
        "X-Include-Drafts": "true",
      },
});

export default client;
