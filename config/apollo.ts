import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.DATO_CMS_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.DATO_CMS_API_KEY}`,
  },
});

export default client;
