import axios from "axios";
import client from "../config/apollo";
import { gql } from "@apollo/client";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
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
          photos {
            id
            alt
            url
          }
          slugName
          categories {
            name
            slugCategory
            id
            parent {
              name
              id
              slugCategory
            }
          }
        }
      }
    `,
  });

  return result.data.allProducts;
};
export const getProduct = async (slugName: string): Promise<Product> => {
  const result = await client.query({
    query: gql`
      query getProduct {
        product(filter: { slugName: { eq: "chusta-intense" } }) {
          id
          name
          price
          textDescription
          shortDescription
          productColors {
            id
            colorsBase
          }
          categories {
            name
            slugCategory
            id
            parent {
              name
              id
              slugCategory
            }
          }
          tags {
            id
            tag
          }

          photos {
            id
            alt
            url
          }

          slugName
        }
      }
    `,
  });
  return result.data.product;
};
