import { gql } from "@apollo/client";
import client from "../config/apollo";
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const result = await client.query({
    query: gql`
      query getAllCategories {
        allCategories {
          id
          name
          slugCategory
          parent {
            id
            name
            slugCategory
          }
        }
      }
    `,
  });
  return result.data.allCategories;
};
