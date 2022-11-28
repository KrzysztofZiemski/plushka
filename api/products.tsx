import axios from "axios";
import client from "../config/apollo";
import { gql } from "@apollo/client";
import { Product } from "../types/product";

export const getProducts = async (category?: string): Promise<Product[]> => {
  //(filter:{category:{eq:"crochet"}})

  const result = await client.query({
    query: gql`
      query getProducts {
        allProducts {
          id
          name
          price
          textDescription
          shortDescription
          productColors {
            id
            colorsBase
          }
          tags {
            id
            tag
          }
          category
          photos {
            id
            alt
            url
          }
        }
      }
    `,
  });
  return (result.data.allProducts as Product[]).filter(
    (el) => el.category === category
  );
};
