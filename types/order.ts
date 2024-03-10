export type Order = {
  id: number;
  userId: number;
  type: string;
  createdAt: Date | null;
  expiredAt?: Date | null;
  credits?: number | null;
  isPaid: boolean;
};
