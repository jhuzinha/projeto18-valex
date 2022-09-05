import { connection } from "../database.js";
import { Recharge } from "../types/cardTypes.js";

export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findByCardIdRecharges(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}
