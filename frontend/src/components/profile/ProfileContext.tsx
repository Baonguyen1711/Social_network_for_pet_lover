import React, { createContext, ReactNode, useState } from 'react'

interface ProfileContextType {
    url: string | undefined; 
    setUrl: (url:string) => void
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode;}> = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const url = `http://localhost:5000/api/v1/post/getpostsbyuserid?userId=${userId}`;
    const [currentUrl, setUrl] = useState<string>(url);
    return (
      <ProfileContext.Provider value={{ url: currentUrl,setUrl:setUrl}}>
        {children}
      </ProfileContext.Provider>
    );
  };
