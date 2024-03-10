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
