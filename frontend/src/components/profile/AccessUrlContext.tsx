import React, { createContext, ReactNode, useState } from 'react'
import { User } from '../../types';

interface ProfileContextType {
    url: string | undefined; 
    setUrl: (url:string) => void
    targetUserId:string|null|undefined
}

export const AccessUrlContext = createContext<ProfileContextType | undefined>(undefined);

export const AccessUrlProvider: React.FC<{ children: ReactNode;type:String,TargetUserId?:string|null}> = ({ children,type ,TargetUserId}) => {
  let url=""
  const userId = localStorage.getItem('userId');
  if(type==="profile")
  {
    url = `http://localhost:5000/api/v1/post/getpostsbyuserid?targetId=${TargetUserId}&userAccessId=${userId}`;
  } else 
  { 
    url = `http://localhost:5000/api/v1/post/getposthome/${userId}`;
  }
  
    const [currentUrl, setUrl] = useState<string>(url);
    return (
      <AccessUrlContext.Provider value={{ url: currentUrl,setUrl:setUrl,targetUserId:TargetUserId}}>
        {children}
      </AccessUrlContext.Provider>
    );
  };
