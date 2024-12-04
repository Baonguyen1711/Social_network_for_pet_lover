import { Avatar, Button, Icon } from "@mui/material";
import style from './css/ProfileContainer.module.css'
import React, { useEffect, useState } from "react";
import { User } from "../../types";
interface Properties
{
  userData:User|undefined
}
const ProfileContainer:React.FC<Properties> = (props) => {
  
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <Avatar sx={{height:"80px",width:"80px"}} src={props.userData?.avatar}/>
      </div>
      <div className={style.containerRight}>
        <div className={style.containerRight_Top}>
          <h1>{props.userData?.firstname+" "+props.userData?.lastname}</h1>
          <Button sx={{background:"#DFDFDF",height:"30px",alignSelf:"flex-end",color:"#000",borderRadius:"8px",fontSize:"12px",fontWeight:"bold","&:hover": {
      background: "#89966B", 
      color: "#fff",      
    },}}>Edit profile</Button>
        </div>
        <div className={style.containerRight_Bottom}>
          <div className={style.containerinfo}>
            <div className={style.sectionInfo}>Description</div>
            <div className={style.sectionSenDetails}>
              {props.userData?.description}
            </div>
          </div>
          <div className={style.containerinfo}>
            <div className={style.sectionInfo}>Living</div>
            <div className={style.sectionSenDetails}>
              {props.userData?.location}
            </div>
          </div>
          <div className={style.containerinfo}>
            <div className={style.sectionInfo}>My pets</div>
            <div className={style.sectionBossAMount}>
                <div className={style.bossIcon}>
                    <img src="" alt="" />
                    <h5>1</h5>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
