import React from 'react'
import AdminNavbar from '../../../components/adminComponents/AdminNavbar'
import AdminFooter from '../../../components/adminComponents/AdminFooter'
import AdminUsersContent from '../../../components/adminComponents/content/AdminUsersContent'

function AdminUserList() {
  return <>
    <AdminNavbar/>
    <AdminUsersContent/>
    <AdminFooter/>
  </>
}

export default AdminUserList