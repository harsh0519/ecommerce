import React, {useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

export const CartDataContext = React.createContext()

function CartDataComponent ({children}){

    const [cart, setCart] = useState(0)
    const [loggedIn, setLoggedIn] = useState(false)
    let getLoginToken = localStorage.getItem('loginToken')
    
    const getCartCount = async() => {
        try { 
            getLoginToken && setLoggedIn(true) 
            if(loggedIn === true) {
                let decodedToken = jwtDecode(getLoginToken)
                let id = decodedToken.id
                let res = await AxiosService.get(`${ApiRoutes.CURRENTUSER.path}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
                let result = res.data.currentUser
                let cartCount = result.cartList.length
                if(res.status === 200){
                    setCart(cartCount)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        getCartCount()
    },[cart])

    return <>
        <CartDataContext.Provider value={{cart, setCart}}>
            {children}
        </CartDataContext.Provider>
    </>
}

export default CartDataComponent