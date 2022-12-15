import { gql } from "@apollo/client";
import client, { clientHyGraph } from "../config/apollo";
import { CategoryDatoCms, Category } from "../types/category";

export const getCategoriesDatoCms = async (): Promise<CategoryDatoCms[]> => {
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
` {
  categoriesPlural {
    categories(where: { isMainCategory: false }) {
      categoryName
      id
      isMainCategory
      slug
      categories {
        categoryName
        slug
        id
      }
    }
  }
}`;

export const getCategories = async (): Promise<Category[]> => {
  const result = await clientHyGraph.query({
    query: gql`
      {
        categoriesPluralConnection {
          edges {
            node {
              id
              categoryName
              slug
              isMainCategory
              categories {
                categoryName
                id
                slug
              }
            }
          }
        }
      }
    `,
  });

  const output = result.data.categoriesPluralConnection.edges.map(
    (el: any) => el.node
  );
  return output;
};
