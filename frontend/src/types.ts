// types.ts
export interface User {
  _id: string; // or other relevant properties
  firstname: string;
  lastname: string;
  avatar: string;
  location: string;
  email: string;
  description:string;
  // Add any other user-related properties
  
}

export interface MessageComponentType {
  content: string;
  timeStamp: string;
  isSender: boolean | undefined;
}

export interface RecentChat {
  _id: string;
  latestMessage: string;
  timeStamp: string;
}
export interface RecentChatInSideBar {
  _id: string;
  latestMessage: string;
  timeStamp: string;
  userInfo: User;
}

export interface Recipent {
  recipentEmail: string | null;
  senderEmail: string | null;
  content: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  payload: {
    user: User | null;
    jwt: string | null;
  };
}

export interface LogInAction {
  type: "LOG_IN";
  payload: {
    user: User;
    jwt: string;
  };
}

export interface LogOutAction {
  type: "LOG_OUT";
}

export interface Event {
  eventName: string;
  description: string;
  dateTime: Date;
  imageUrl: string;
  location: string;
  createdBy: string;
  createdAt: string;
  isDelete: boolean;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  userId: string;
  
  userInfo:UserInfo;
  likedUserInfo: User[];
  isLiked: Like
}

export interface Like 
{
  _id:string,
  userId: string,
  postId: string,
  timeStamp: Date,
  isDeleted: boolean,
}

export interface UserInfo
{
  firstname:string;
  lastname:string;
  avatar:string
}

export interface PostResponse {
  recommentPost: Post[];
}

export interface FormPost {
  title: string;
  content: string;
  images: string;
}
export interface FormPet {
  name: string;
  bio: string;
  profilePicture: string;
  sex:string,
  height:number,
  weight:number,
  type:string,
  breed:string,
  birthday:string
}

export interface Pet {
  _id:string,
  name: string,
  bio: string,
  profilePicture: string,
  userId: string,
  sex:string,
  height:number,
  weight:number,
  type:string,
  breed:string,
  birthday:string,
  createdAt: string,
  updatedAt: string,
  isDeleted: string,
}

export interface IComment 
{
  _id:string,
  content : string,
  postId : string,
  userId : string,
  parentId : string,
  createdAt : Date,
  updatedAt : Date,
  isDeleted : string,

  userInfo: UserInfo
}
export interface PostComment 
{
  content : string,
  postId : string,
  userId : string,
  parentId : string,
}
export type AuthAction = LogInAction | LogOutAction;
