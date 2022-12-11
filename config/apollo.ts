import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.DATO_CMS_URL,
  cache: new InMemoryCache(),
  headers:
    process.env.NODE_ENV === "development"
      ? {
          authorization: `Bearer ${process.env.DATO_CMS_API_KEY}`,
          "X-Include-Drafts": "true",
        }
      : {
          authorization: `Bearer ${process.env.DATO_CMS_API_KEY}`,
        },
});

export default client;
