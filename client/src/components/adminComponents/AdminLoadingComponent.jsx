import React from 'react'
import { Spinner } from 'react-bootstrap'
import AdminFooter from './AdminFooter'
import AdminNavbar from './AdminNavbar'

function AdminLoadingComponent() {
  return <>
      <AdminNavbar/>
      <div>
        <p className='loader'><Spinner animation='border'/></p>
      </div>
      <AdminFooter/>
  </>
}

export default AdminLoadingComponent