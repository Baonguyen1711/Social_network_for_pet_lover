import React from "react";

export const register = (body: object) => {
  const url = "http://127.0.0.1:5000/api/v1/register";
};

export const getUserByUserId = async (userId: string | undefined | null) => {
  const url = `http://localhost:5000/api/v1/user/getbyid/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error in getting user");
    }
    const data = await response.json();
    return data.user;
  } catch (e) {
    console.error("Error fetching data:", e);
    return undefined;
  }
};
export async function handleFollow(
  follower: string | null,
  followingId: string | undefined
) {
  try {
    const response = await fetch("http://localhost:5000/api/v1/follow/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followerId: follower,
        followingId: followingId,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error following user:", error);
    alert("Error occurred while trying to follow.");
  }
}
export async function checkFollowed(
  follower: string | null,
  followingId: string | undefined
) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/follow/isfollowed",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: follower,
          followingId: followingId,
        }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetch follow user:", error);
    alert("Error occurred while trying to fetch follow.");
  }
}
export async function handleLikePost(postId: string | undefined) {
  if (postId == undefined) return;
  try {
    const response = await fetch("http://localhost:5000/api/v1/like/likepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        targetId: postId,
        targetType: "post",
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function handleGetFavouritedPetByUserId() {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/petuser/favourited/getbyuserid?userId=${userId}`,
      {
        method: "Get",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    const result = await response.json();
    if(result.pets.length>0) //FavouritePet
    return result.pets;
  return null;
  } catch (e) {
    console.error(e);
  }
}

export async function createPetUserRelationship(
  petId: string | null
) {
  if (petId === undefined) return;
  try {
    const response = await fetch("http://localhost:5000/api/v1/petuser/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        petId: petId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create petuser");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function handleDeletePetUserById (petUserId:String|undefined)
{
  if (petUserId === undefined) return;
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/petuser/delete?petUserId=${petUserId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    const result = await response.json();
    //console.log("return petuser",result)
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function isChecked (userId:string|undefined|null,petId:string)
{
  if (userId === undefined||petId === undefined) return;
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/petuser/checksaved?userId=${userId}&petId=${petId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    const result = await response.json();
    //console.log("return petuser",result)
    return result;
  } catch (e) {
    console.error(e);
  }
}

//FavvouritePost
export async function createPostUserRelationship(
  postId: string | null|undefined
) {
  if (postId === undefined) return;
  try {
    const response = await fetch("http://localhost:5000/api/v1/postuser/toggleSave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        postId: postId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create postuser");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}
export async function handleGetFavouritedPostByUserId() {
  const userId = localStorage.getItem("userId");
  console.log("sdsda")
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/postuser/favourited/getbyuserid?userId=${userId}`,
      {
        method: "Get",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    const result = await response.json();
    if(result.posts.length > 0) //FavouritePet
    return result.posts;
  return null;
  } catch (e) {
    console.error(e);
  }
}

export async function handleDeletePostUserById (postUserId:String|undefined)
{
  if (postUserId === undefined) return;
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/postuser/delete?postUserId=${postUserId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete favourtie post");
    }
    const result = await response.json();
    //console.log("return petuser",result)
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function handleGetPostByPostId(postId:String|null|undefined,userId:string|null)
{
  if (postId === undefined) return;
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/post/getpostbypostid?postId=${postId}&userAccessId=${userId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete favourtie post");
    }
    const result = await response.json();
    //console.log("return petuser",result)
    return result.post;
  } catch (e) {
    console.error(e);
  }
}
