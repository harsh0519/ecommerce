import React from 'react'
import AppNavbar from '../../../components/userComponents/AppNavbar'
import AppFooter from '../../../components/userComponents/AppFooter'
import CartContent from '../../../components/userComponents/contents/CartContent'

function Cart() {
    return <>
        <AppNavbar/>
        <CartContent/>
        <AppFooter/>
    </>
}

export default Cart