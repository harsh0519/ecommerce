import React, { useState } from 'react'
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AdminNavbar from '../../../components/adminComponents/AdminNavbar'
import AdminFooter from '../../../components/adminComponents/AdminFooter'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'


function AdminLogin() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    let formik = useFormik({
        initialValues:{
        email:'',
        password:''
        },
        validationSchema:Yup.object({          
        email:Yup.string().required('Email is required').email('Enter a valid email'),
        password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
        }),
        onSubmit : async(values) => {
            try {
                setLoading(true)
                let res = await AxiosService.post(`${ApiRoutes.ADMINLOGIN.path}`,values)
                if(res.status === 200){
                    localStorage.setItem('adminLoginToken',res.data.adminLoginToken)
                    navigate('/admin/dashboard')
                }
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.message || error.message)
            }
        }
    })

    return <>
        <AdminNavbar/>
        <Container>
            <Col md xs={12}>
                <Form onSubmit={formik.handleSubmit} className='adminAuthForm mx-auto my-5 p-5 rounded-5'>                
                    <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email ? (<div className='adminAuthErrorText'>{formik.errors.email}</div>) : null}
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                        {formik.touched.password && formik.errors.password ? (<div className='adminAuthErrorText'>{formik.errors.password}</div>) : null}
                    </Form.Group>
                    
                    <div className='mb-4'>
                        <Link to={'/admin/forgotpassword'} className='adminFrgtPwdText'>Forgot Password ?</Link>
                    </div>
                    
                    <div className="d-grid mb-4">
                        <Button className='formBtns' type='submit'disabled={loading}>{loading ? <Spinner animation="border" /> : 'Login'}</Button>
                    </div>
                    <hr style={{color:"blue"}}/>
                    <div className="d-grid mb-4">
                        <Button className='formBtns' onClick={()=>navigate('/admin/register')}>Sign Up</Button>
                    </div>
                </Form>
            </Col>
        </Container>
        <AdminFooter/>
    </>
}

export default AdminLogin