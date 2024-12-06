import React from 'react'
import SideBarLRForm from '../../components/shared/SideBarLR/SideBarLRForm'
import HomeForm from '../../components/home/HomeForm'

const HomePage = () => {
  return (
    <div>
      <SideBarLRForm>
         <HomeForm/>
        </SideBarLRForm>
    </div>
  )
}

export default HomePage
