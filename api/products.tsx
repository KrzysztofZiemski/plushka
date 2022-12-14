import axios from "axios";
import client from "../config/apollo";
import { gql } from "@apollo/client";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const result = await client.query({
    query: gql`
      query getProducts {
        allProducts(orderBy: _updatedAt_DESC) {
          id
          name
          price
          textDescription
          shortDescription
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
          colors {
            colorName
            colorValue {
              hex
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
        product(filter: { slugName: { eq: "${slugName}" } }) {
          id
          name
          price
          textDescription
          shortDescription
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

          colors{
            colorName
            colorValue{
              hex
            }
          }
        }
      }
    `,
  });
  return result.data.product;
};
