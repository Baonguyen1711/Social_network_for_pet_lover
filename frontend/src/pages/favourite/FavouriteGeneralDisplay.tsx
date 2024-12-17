import React, { useEffect, useState } from "react";
import style from "./css/FavouriteGeneral.module.css";
import {
  handleGetFavouritedPetByUserId,
  handleGetFavouritedPostByUserId,
} from "../../sercives/api";
import { PetFavourite, PostFavourite } from "../../types";
import { Avatar } from "@mui/material";

const FavouriteGeneralDisplay = () => {
  const [pets, setPets] = useState<PetFavourite[]>();
  const [posts, setPosts] = useState<PostFavourite[]>();

  useEffect(() => {
    const fetchData = async () => {
      const pets = await handleGetFavouritedPetByUserId();
      setPets(pets);
      const posts = await handleGetFavouritedPostByUserId();
      setPosts(posts);
    };
    fetchData();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.favouriteContainer}>
        <p className={style.section}>Pets Favourite</p>
        <div className={style.containerInside}>
          {pets?.map((pet, index) => (
            <div key={pet.petInfo._id} className={style.petAvatar}>
              <img src={pet.petInfo.profilePicture}></img>
              <span>{pet.petInfo.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={style.favouriteContainer}>
        <p className={style.section}>Posts Favourite</p>
        <div className={style.containerInside}>
          <div className={style.petAvatar}></div>
          <div className={style.petAvatar}></div>
          <div className={style.petAvatar}></div>
          <div className={style.petAvatar}></div>
          <div className={style.petAvatar}></div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteGeneralDisplay;
