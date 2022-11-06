import { Pool, QueryResult, QueryResultRow } from "pg";
import { databaseConfigConnection } from "../../api/config/postgresqp";

const pool = new Pool(databaseConfigConnection);
pool.connect();

export const query = async <Type extends QueryResultRow>(
  query: string
): Promise<QueryResult<Type>> => {
  const res = await pool.query(query);

  return res;
};
