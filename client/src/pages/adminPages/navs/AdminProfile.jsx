import React from 'react'
import AdminNavbar from '../../../components/adminComponents/AdminNavbar'
import AdminFooter from '../../../components/adminComponents/AdminFooter'
import AdminProfileContent from '../../../components/adminComponents/content/AdminProfileContent'

function AdminProfile() {
    return <>
        <AdminNavbar/>
        <AdminProfileContent/>
        <AdminFooter/>
    </>
}

export default AdminProfile