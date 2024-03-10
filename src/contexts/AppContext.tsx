import { createContext, useEffect, useState } from "react";
import {
  ContextProviderProps,
  ContextProviderValue,
} from "../../types/context";
import { User } from "../../types/user";
import toast from "react-hot-toast";

// export const AppContext = createContext({} as ContextProviderValue);
export const AppContext = createContext({} as ContextProviderValue);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const fetchUserInfo = async function () {
    // console.log("fetch user info!!!!!!!!!!!! context");
    try {
      const params = {};

      const resp = await fetch("/api/user");

      if (resp.ok) {
        const res = await resp.json();
        // console.log("context res ", res);

        if (res) {
          setUser(res);
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
    <AppContext.Provider value={{ user, fetchUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};
