// types.ts
export interface User {
    id: string; // or other relevant properties
    name: string;
    // Add any other user-related properties
}

export interface MessageComponentType {
    content: string,
    timeStamp: string,
    isSender: boolean|undefined
  }


export interface RecentChat {
    _id: string,
    latestMessage: string,
    timeStamp: string,
    userInfo: {
        email: string | undefined,

        phone: string | undefined,
        firstname: string | undefined,
        lastname: string | undefined,
        
        avatar: string| undefined
    } | null
}


export interface Recipent {
    recipentEmail: string | null,
    senderEmail: string |null,
    content: string | null
}

export interface AuthState {
    isAuthenticated: boolean;
    payload: {
        user: User | null;
        jwt: string | null;
    }
}

export interface LogInAction {
    type: 'LOG_IN';
    payload: {
        user: User;
        jwt: string;
    };
}

export interface LogOutAction {
    type: 'LOG_OUT';
}

export type AuthAction = LogInAction | LogOutAction;
