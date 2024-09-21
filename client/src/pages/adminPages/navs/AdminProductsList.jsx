import React from 'react'
import AdminNavbar from '../../../components/adminComponents/AdminNavbar'
import AdminFooter from '../../../components/adminComponents/AdminFooter'
import AdminProductsContent from '../../../components/adminComponents/content/AdminProductsContent'


function AdminProductsList() {
  return <>
    <AdminNavbar/>
    <AdminProductsContent/>
    <AdminFooter/>
  </>
}

export default AdminProductsList