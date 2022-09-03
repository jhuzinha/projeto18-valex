import { connection } from "../database.js";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string | string[] | undefined) {
  const result = await connection.query<Company, [string | string[] | undefined]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}
