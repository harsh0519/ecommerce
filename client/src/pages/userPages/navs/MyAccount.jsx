import React from 'react'
import AppNavbar from '../../../components/userComponents/AppNavbar'
import AppFooter from '../../../components/userComponents/AppFooter'
import MyAccountContent from '../../../components/userComponents/contents/MyAccountContent'

function MyAccount() {
    return <>
    <AppNavbar/>
    <MyAccountContent/>
    <AppFooter/>
    </>
}

export default MyAccount