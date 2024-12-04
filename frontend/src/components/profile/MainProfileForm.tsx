import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import style from "./css/MainProfileForm.module.css";
import { Outlet, Link } from "react-router-dom";
import { User } from "../../types";

const MainProfileForm: React.FC = () => {
  const [userData,setUserData] = useState<User>()
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const fetchData = async () => { 
      const url = `http://localhost:5000/api/v1/user/getbyid?userId=${userId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in getting user");
        }
        const data = await response.json();
        setUserData(data.user);
      } catch (e) { 
        console.error("Error fetching data:", e);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []);
  return (
    <div className={style.coverContainer}>
      <div className={style.bodyContainer}>
        <ProfileContainer userData={userData} />
        <nav className={style.navbar}>
          <a>
            <Link to="/profile/posts" className={style.link}>Posts</Link>
          </a>
          <a>
            <Link to="/profile/pets" className={style.link}>Pets</Link>
          </a>
        </nav>
        <div className={style.layout}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainProfileForm;
