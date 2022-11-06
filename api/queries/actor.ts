import { QueryResult, QueryResultRow } from "pg";
import { query } from "./query";

export const actorQuery = "select * from actor";

export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  last_update: string;
}
export const getActors = async () => {
  const result = await query(actorQuery);
  return result.rows as Actor[];
};
