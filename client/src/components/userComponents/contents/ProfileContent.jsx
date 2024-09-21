import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Button, Container, Form, Modal } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function ProfileContent() {

    let navigate = useNavigate()
    const [userAuth,setUserAuth] = useState()
    const [oldData, setOldData] = useState([])
    let firstname = oldData?.firstName
    let lastname = oldData?.lastName
    let mobileNum = oldData?.mobile
    let emailId = oldData?.email
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false);
    
    const getLoginToken = localStorage.getItem('loginToken')    
    const decodedtoken = jwtDecode(getLoginToken)
    const id = decodedtoken.id
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleUpdatedDetails = async() => {
        try {
            let updatedDetails = {
            firstName : fname === ''? firstname : fname,
            lastName : lname === '' ? lastname : lname,
            mobile : mobile === ''? mobileNum : mobile,
            email : email === ''? emailId : email
            }
            let res = await AxiosService.put(`${ApiRoutes.USERPROFILEUPDATE.path}/${userAuth?._id}`,updatedDetails,{ headers : {
            'Authorization' : `${getLoginToken}`
            }})
            let result = res.data.updatedProfile
            handleClose()
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
  
    const getUser = async() => {
        try {
            let getLoginToken = localStorage.getItem('loginToken')
            if(getLoginToken){
                const decodedToken = jwtDecode(getLoginToken)
                const id = decodedToken.id
                let res = await AxiosService.get(`${ApiRoutes.CURRENTUSER.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
                let result = res.data.currentUser
                if(res.status === 200){
                    setUserAuth(result)
                    setOldData(res.data.currentUser)                    
                }
            }
        } catch (error) {
            // console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=>{
        getUser()
    },[oldData, userAuth])

    return <>
        <Container className='my-4'>
            <Breadcrumb>
                <Breadcrumb.Item onClick={()=> navigate('/myaccount')}>My Account</Breadcrumb.Item>
                <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
            </Breadcrumb>

            <div className='profileBlock mx-auto'>
                <div className='profileData'>
                    <h4 className='text-center'>Profile details</h4>
                    <div>
                        <h6>Firstname</h6>
                        <p className='profileTextField mb-0'>{oldData?.firstName}</p>
                    </div>
                    <hr />
                    <div>
                        <h6>Lastname</h6>
                        <p className='profileTextField mb-0'>{oldData?.lastName}</p>
                    </div>
                    <hr />
                    <div>
                        <h6>Email</h6>
                        <p className='profileTextField mb-0'>{oldData?.email}</p>
                    </div>
                    <hr />
                    <div>
                        <h6>Mobile</h6>
                        <p className='profileTextField mb-0'>{oldData?.mobile}</p>
                    </div>
                </div>
                <Button type='button' style={{width : "100%"}} className='mt-5' onClick={handleShow}>Edit details</Button>
            </div>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" placeholder="Enter FirstName" defaultValue={firstname} onChange={(e) => setFname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" placeholder="Enter LastName" defaultValue={lastname} onChange={(e) => setLname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" defaultValue={emailId} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="number" placeholder="Enter Mobile" defaultValue={mobileNum} onChange={(e) => setMobile(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdatedDetails}>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default ProfileContent