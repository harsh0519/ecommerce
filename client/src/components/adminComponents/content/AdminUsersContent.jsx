import React, { useContext, useState } from 'react'
import { Button, Container, Table, Modal, Form, Breadcrumb, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { UserListContext } from '../../../contextApi/UserListContextComponent'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function AdminUsersContent() {
    
    let navigate = useNavigate()
    let { users } = useContext(UserListContext)
    const [currentUser, setCurrentUsers] = useState([])
    const [popup, setPopup] = useState(false)
    const [userID, setUserID] = useState()
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [mobile,setMobile] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState()
    const [show, setShow] = useState(false);

    let adminLoginToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(adminLoginToken)
    let decodedTokenId = decodedToken.id

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePopUp = async(id) => {
        setPopup(true)
        setUserID(id)
    }

    const handleModal = (id) => {
        getUserData(id)
    }

    const handleUpdateData = async(id) => {
        let updateData = {
            firstName : fname === ''? currentUser?.firstName : fname,
            lastName : lname === '' ? currentUser?.lastname : lname,
            mobile : mobile === ''? currentUser?.mobile : mobile,
            email : email === ''? currentUser?.email : email,
            isAdmin
        }
        try {
            let res = await AxiosService.put(`${ApiRoutes.ADMINEDITUSER.path}/${id}/${decodedTokenId}`,updateData, { headers : { 'Authorization' : `${adminLoginToken}`}})
            if(res.status === 200){
                handleClose()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const getUserData = async(id) => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTUSER.path}/${id}/${decodedTokenId}`, { headers : { 'Authorization' : `${adminLoginToken}`}})
            let result = res.data.currentuser
            if(res.status === 200){
                setCurrentUsers(result)
                setIsAdmin(result.isAdmin)
                handleShow()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleDelete = async(id) => {
        try {
            let res = await AxiosService.delete(`${ApiRoutes.ADMINDELETEUSER.path}/${id}/${decodedTokenId}`, { headers : { 'Authorization' : `${adminLoginToken}`}})
            setPopup(false)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Container className='my-5'>
            <Breadcrumb>
                <Breadcrumb.Item onClick={ ()=> navigate('/admin/dashboard')}>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Userslist</Breadcrumb.Item>
            </Breadcrumb>

            <Table striped bordered hover responsive>
                <thead className='text-center'>
                    <tr>
                    <th>S.No</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((e,i) => {
                            return <tr className='text-center' key={i}>
                            <td>{i+1}</td>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.email}</td>
                            <td>{e.isAdmin === true ? "Admin" : "User"}</td>
                            <td className='userActionBtns'>
                                <Button variant='primary' onClick={() => handleModal(e._id)}><FontAwesomeIcon icon={faEdit}/></Button>
                                &nbsp; 
                                <Button variant='danger' onClick={() => handlePopUp(e._id)}><FontAwesomeIcon icon={faTrash}/></Button>
                            </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" >
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" name='fname' defaultValue={currentUser?.firstName} onChange={(e) => setFname(e.target.value)} placeholder="Enter Firstname" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" name='lname' defaultValue={currentUser?.lastName} onChange={(e) => setLname(e.target.value)} placeholder="Enter Lastname" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email Mobile</Form.Label>
                        <Form.Control type="number" name='mobile' defaultValue={currentUser?.mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' defaultValue={currentUser?.email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label>Are you an Admin?</Form.Label>
                        <Col sm={10} className='d-flex flex-row'>
                            <Form.Check className='me-3' type="radio" label="Yes" value="yes" checked={isAdmin === "yes"} onChange={(e) => setIsAdmin(e.target.value)}/>
                            <Form.Check className='me-3' type="radio" label="No" value="no" checked={isAdmin === "no"} onChange={(e) => setIsAdmin(e.target.value)}/>                        
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => handleUpdateData(currentUser?._id)}>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>

        {
            popup && <div className='popupBlock'>
                <div className='alertText'>Are you sure to Remove ?</div>
                <div className='d-flex justify-content-between'>
                    <Button variant='danger' onClick={() => setPopup(false)}>Cancel</Button>
                    <Button variant='primary' onClick={() => handleDelete(userID)}>Remove</Button>
                </div>
            </div>
        }

    </>
}

export default AdminUsersContent