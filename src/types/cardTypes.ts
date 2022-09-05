export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Recharge {
    id: number;
    cardId: number;
    timestamp: Date;
    amount: number;
  }
export interface Payment extends Recharge {
  businessId: number;
}