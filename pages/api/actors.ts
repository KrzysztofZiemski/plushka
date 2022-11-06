// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import { databaseConfigConnection } from "../../api/config/postgresqp";

import { Actor, getActors } from "../../api/queries/actor";
const client = new Client(databaseConfigConnection);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Actor[]>
) {
  try {
    await client.connect();

    const response = await getActors();
    const actors = response.slice(0, Math.floor(Math.random() * 10) + 1);

    return res.status(200).json(actors);
  } catch (err) {
    return res.status(500).json([]);
  }
}
