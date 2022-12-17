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

export const clientHyGraph = new ApolloClient({
  uri: process.env.HYGRAPH_CMS_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.HYGRAPH_API_KEY}`,
  },
});
export default client;
