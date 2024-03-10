import { User, UserQuery } from "../types/user";
import { prisma } from "./db";

/**
 * insert a user , or update a user if exists
 * @param user
 * @returns
 */
export async function insertUserIfNotExist(user: User): Promise<User> {
  const insertUser = await prisma.user.upsert({
    create: {
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      createdAt: user.createdAt,
      status: 0,
    },
    update: {
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      createdAt: user.createdAt,
      status: 0,
    },
    where: {
      email: user.email,
    },
  });
  return insertUser;
}

export async function createUser(user: User): Promise<User> {
  const userCreate = await prisma.user.create({
    data: user,
  });
  return userCreate;
}

export async function fetchUserByEmail(
  email: string,
): Promise<UserQuery | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

/**
 * count , if ==0 , then insert
 * 调用fetch先查询, 然后在调用create
 * @param user
 */
export async function createUserIfNotExists(user: User): Promise<User | null> {
  const res = await fetchUserByEmail(user.email);
  if (res) {
    console.log("user already exists");
    return res;
  }
  console.log("user insert");
  return await createUser(user);
}

export async function fetchUserByUserId(
  userId: number,
): Promise<UserQuery | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}
