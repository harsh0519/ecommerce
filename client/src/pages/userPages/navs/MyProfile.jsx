import React from 'react'
import AppNavbar from '../../../components/userComponents/AppNavbar'
import AppFooter from '../../../components/userComponents/AppFooter'
import ProfileContent from '../../../components/userComponents/contents/ProfileContent'


function MyProfile() {

  return <>
    <AppNavbar/>
    <ProfileContent/>
    <AppFooter/>
  </>
}

export default MyProfile