import React from 'react'
import AppNavbar from '../userComponents/AppNavbar'
import AppFooter from '../userComponents/AppFooter'
import { Spinner } from 'react-bootstrap'

function LoadingComponent() {
  return <>
      <AppNavbar/>
      <div>
        <p className='loader'><Spinner animation='border'/></p>
      </div>
      <AppFooter/>
  </>
}

export default LoadingComponent