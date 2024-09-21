import React from 'react'
import AppNavbar from '../../../components/userComponents/AppNavbar'
import AppFooter from '../../../components/userComponents/AppFooter'
import OrdersContent from '../../../components/userComponents/contents/OrdersContent'

function MyOrders() {
    return <>
    <AppNavbar/>
    <OrdersContent/>
    <AppFooter/>
    </>
}

export default MyOrders