import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

export const UserListContext = React.createContext()

function UserListContextComponent({children}) {

    const [users, setUsers] = useState([])
    const [usercount, setUserCount] = useState()
    const [admincount, setAdminCount] = useState()
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState([])
    let getAdminToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getAdminToken)
    let id = decodedToken.id

    let getAllUsersList = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINALLUSERS.path}/${id}`, { headers : { 'Authorization' : `${getAdminToken}`}})
            if(res.status === 200){
                setUsers(res.data.usersList)
                setUserCount(res.data.userCount)
                setAdminCount(res.data.adminCount)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    const getProductsList = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINGETPRODUCT.path}/${id}`,{ headers : { 
                'Authorization' : `${getAdminToken}`
            }})
            if(res.status === 200) {
                setProducts(res.data.productsList)
                setProductsCount(res.data.productsCount)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    
    useEffect(()=> {
          getAllUsersList()
          getProductsList()
    },[])

    return <>
        <UserListContext.Provider value={{users, usercount, admincount, products, productsCount}}>
            {children}
        </UserListContext.Provider>
    </>
}

export default UserListContextComponent