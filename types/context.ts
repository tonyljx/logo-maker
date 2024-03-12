import { ReactNode } from "react";
import { TImgShowBackend } from "./img";
import { User, UserStatus } from "./user";

export interface ContextProviderValue {
  user: User | null | undefined;
  userStatus: UserStatus;
  images: Array<TImgShowBackend> | null;
  fetchPhotos: () => Promise<void>;
  [propName: string]: any;
}

export interface ContextProviderProps {
  children: ReactNode;
}
