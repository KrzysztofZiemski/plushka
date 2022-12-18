import axios from "axios";
import client, { clientHyGraph } from "../config/apollo";
import { gql } from "@apollo/client";
import { ProductDatoCms, Product } from "../types/product";

export const getProductsDatoCms = async (): Promise<ProductDatoCms[]> => {
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
export const getProductDatoCms = async (
  slugName: string
): Promise<ProductDatoCms> => {
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

export const getProducts = async (): Promise<Product[]> => {
  const result = await clientHyGraph.query({
    query: gql`
      {
        products {
          name
          price
          slug
          photos {
            height
            fileName
            url
            width
            size
          }
          shortDescription
          id
          description
          colors {
            name
            id
            color {
              hex
            }
          }
        }
      }
    `,
  });
  const output = result.data.products || [];
  return output;
};
