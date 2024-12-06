import React from "react";
import SideBarLRForm from "../../components/shared/SideBarLR/SideBarLRForm";
import MainProfileForm from "../../components/profile/MainProfileForm"; 

const   ProfilePage = () => {
  return (
    <div>
        <SideBarLRForm>
          <MainProfileForm />
        </SideBarLRForm>
    </div>
  );  
};

export default ProfilePage;
