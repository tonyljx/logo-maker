export type User = {
  createdAt: Date;
  email: string;
  userName: string;
  avatarUrl: string;
  status: number;
};

export type UserQuery = {
  id: number;
  createdAt: Date;
  email: string;
  userName: string;
  avatarUrl: string;
  status: number;
};

/**
 * 客户端需要使用的类型
 */
export interface UserStatus {
  status: "unsubscribed" | "month" | "quarter" | "year" | "one-time";
  expiredAt: Date | null;
}
