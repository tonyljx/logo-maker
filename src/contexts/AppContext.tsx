import { createContext, useEffect, useState } from "react";
import {
  ContextProviderProps,
  ContextProviderValue,
} from "../../types/context";
import { User, UserStatus } from "../../types/user";
import toast from "react-hot-toast";

// export const AppContext = createContext({} as ContextProviderValue);
export const AppContext = createContext({} as ContextProviderValue);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    status: "unsubscribed",
    expiredAt: null,
  });
  const fetchUserInfo = async function () {
    // console.log("fetch user info!!!!!!!!!!!! context");
    try {
      const params = {};
      // user data
      const resp = await fetch("/api/user");
      if (resp.ok) {
        const res = await resp.json();
        // console.log("context res ", res);
        if (res) {
          setUser(res);
          setUserStatus(res?.userStatus);
          return;
        }
      }
      setUser(null);
    } catch (e) {
      setUser(null);
      console.log("get user info failed: ", e);
      toast.error("get user info failed");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider value={{ user, fetchUserInfo, userStatus }}>
      {children}
    </AppContext.Provider>
  );
};
