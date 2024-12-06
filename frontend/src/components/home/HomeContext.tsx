import React, { createContext, ReactNode, useState } from "react";
import { Post, IComment } from "../../types";

interface HomeContextType {
  url: String;
  setUrl: (string: string) => void;
}

export const HomePostsContext = createContext<HomeContextType | undefined>(
  undefined
);

export const HomePostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userId = localStorage.getItem("userId");
  const url = `http://localhost:5000/api/v1/post/getpostsbyid?userId=${userId}`;
  const [currentUrl, setCurrentUrl] = useState<string>(url);
  return (
    <HomePostsContext.Provider
      value={{ url: currentUrl, setUrl: setCurrentUrl }}
    >
      {children}
    </HomePostsContext.Provider>
  );
};
