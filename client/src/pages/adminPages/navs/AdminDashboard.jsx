import React, { useContext } from 'react'
import { Container, Card, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserListContext } from '../../../contextApi/UserListContextComponent'
import AdminNavbar from '../../../components/adminComponents/AdminNavbar'
import AdminFooter from '../../../components/adminComponents/AdminFooter'
import usersList from '../../../assets/usersList.svg'
import productsList from '../../../assets/productsList.svg'

function AdminDashboard() {

  let navigate = useNavigate()
  let { usercount, admincount, productsCount } = useContext(UserListContext)

  return <>
    <AdminNavbar/>
    <Container>
      <div className='dashboardCards'>
        <Card className='cardAcc' onClick={()=> navigate('/admin/dashboard/userslist')}>
              <Card.Body className='cardBody'>
                  <Image src={usersList} className='cardImage'/>
                  <div className='cardBodyText'>
                      <h4>UsersList</h4>
                      <p className='subtitle'>Users : {usercount}</p>
                      <p className='subtitle'>Admins :{admincount}</p>
                  </div>
              </Card.Body>
          </Card>
          <Card className='cardAcc' onClick={()=> navigate('/admin/dashboard/productslist')}>
              <Card.Body className='cardBody'>
                  <Image src={productsList} className='cardImage'/>
                  <div className='cardBodyText'>
                      <h4>ProductsList</h4>
                      <p className='subtitle'>Products : {productsCount}</p>
                  </div>
              </Card.Body>
          </Card>
      </div>
    </Container>
    <AdminFooter/>
  </>
}

export default AdminDashboard