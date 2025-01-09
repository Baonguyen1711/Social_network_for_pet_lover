import { Avatar, Button, Icon } from "@mui/material";
import style from "./css/ProfileContainer.module.css";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import EditProfileTool from "./User/EditProfileTool";
import { useParams } from "react-router-dom";
import { checkFollowed, handleDeleteFollow } from "../../sercives/api";
interface Properties {
  userData: User | undefined;
}
const ProfileContainer: React.FC<Properties> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();

  const handleCloseEditModal = () => {
    setIsOpenModal(false);
  };
  useEffect(()=>{
    const fetchData = async () => {
      const result = await checkFollowed(localStorage.getItem("userId"),userId)
      setIsFollowing(result.isFollowed)
    }
    fetchData()
  },[props.userData])
  const handleOpenEditModal = () => setIsOpenModal(true);
  const handleGetUpdatedUserInformation = (newUser: User | undefined) => {};
  async function handleFollowOrUnfollow() {
    try {
      if (isFollowing) {
        const result = await handleDeleteFollow(localStorage.getItem("userId"),userId)
        if(result) setIsFollowing(false)
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/follow/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              followerId: localStorage.getItem("userId"),
              followingId: userId,
            }),
          }
        );

        if (response.ok) {
          alert("Followed successfully");
          setIsFollowing(true);
          // Cập nhật trạng thái nút Follow nếu cần (ví dụ: đổi thành "Unfollow")
        } else {
          alert("Failed to follow user.");
        }
      }
    } catch (error) {
      console.error("Error following user:", error);
      alert("Error occurred while trying to follow.");
    }
  }
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <Avatar
          sx={{ height: "80px", width: "80px" }}
          src={props.userData?.avatar}
        />
      </div>
      <div className={style.containerRight}>
        <div className={style.containerRight_Top}>
          <h1>{props.userData?.firstname + " " + props.userData?.lastname}</h1>
          {props.userData?._id === localStorage.getItem("userId") ? (
            <Button
              sx={{
                background: "#DFDFDF",
                height: "30px",
                alignSelf: "flex-end",
                color: "#000",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "bold",
                "&:hover": {
                  background: "#89966B",
                  color: "#fff",
                },
              }}
              onClick={handleOpenEditModal}
            >
              Edit profile
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              style={{ height: "30px" }}
              onClick={() => handleFollowOrUnfollow()}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
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
                <h5>{props.userData?.petCount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileTool
        oldUserInformation={props.userData}
        onUpdate={handleGetUpdatedUserInformation}
        isOpen={isOpenModal}
        onClose={handleCloseEditModal}
      />
    </div>
  );
};

export default ProfileContainer;
