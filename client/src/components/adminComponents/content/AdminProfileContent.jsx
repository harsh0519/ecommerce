import React, { useEffect, useState } from 'react'
import { Breadcrumb, Container, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function AdminProfileContent() {

    let navigate = useNavigate()
    const [profile, setProfile] = useState()
    const [show, setShow] = useState(false)
    let firstname = profile?.firstName
    let lastname = profile?.lastName
    let mobileNum = profile?.mobile
    let emailId = profile?.email
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    let getAdminToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getAdminToken)
    let id = decodedToken.id

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdateProfile = async() => {
        let updatedDetails = {
            firstName : fname === ''? firstname : fname,
            lastName : lname === '' ? lastname : lname,
            mobile : mobile === ''? mobileNum : mobile,
            email : email === ''? emailId : email
        }
        try {
            let res = await AxiosService.put(`${ApiRoutes.ADMINUPDATEPROFILEUSER.path}/${id}`,updatedDetails, {headers : { 'Authorization' : `${getAdminToken}` } })
            let result = res.data.updatedProfile
            if(res.status === 200) {
                handleClose()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message) 
        }
    }

    let getProfileData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINPROFILEUSER.path}/${id}`, {headers : { 'Authorization' : `${getAdminToken}` } })
            if(res.status === 200) {
                setProfile(res.data.profile)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message) 
        }
    }

    useEffect(()=> {
        getProfileData()
    },[profile])

    return <>
        <Container className='my-4'>

            <Breadcrumb className='mb-2'>
                <Breadcrumb.Item onClick={ ()=> navigate('/admin/dashboard')}>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>

            <div className='adminProfileBlock mx-auto'>
                    <div className='adminProfileData'>
                        <h4 className='text-center'>Profile details</h4>
                        <div>
                            <h6>Firstname</h6>
                            <p className='adminProfileTextField mb-0'>{profile?.firstName}</p>
                        </div>
                        <hr />
                        <div>
                            <h6>Lastname</h6>
                            <p className='adminProfileTextField mb-0'>{profile?.lastName}</p>
                        </div>
                        <hr />
                        <div>
                            <h6>Email</h6>
                            <p className='adminProfileTextField mb-0'>{profile?.email}</p>
                        </div>
                        <hr />
                        <div>
                            <h6>Mobile</h6>
                            <p className='adminProfileTextField mb-0'>{profile?.mobile}</p>
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
                    <Button variant="primary" onClick={handleUpdateProfile}>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default AdminProfileContent