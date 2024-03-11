export type OrderReq = {
  userEmail: string;
  type: string;
  createdAt: Date;
  expiredAt?: Date | null;
  credits?: number | null;
  isPaid: number;
};

export type Order = {
  orderId: string;
  userEmail: string;
  type: string;
  createdAt: Date;
  expiredAt?: Date | null;
  credits?: number | null;
  isPaid: number;
};
