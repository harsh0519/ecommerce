import React from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function ContactContent() {

  let formik = useFormik({
    initialValues:{
      userName:'',
      email:'',
      mobile:'',
      description:'',
    },
    validationSchema:Yup.object({       
      userName:Yup.string().required('Firstname is required').max(20,'Name can not exceed 20 characters').min(3,'firstName can not be shorter than 3 leters'),
      email:Yup.string().required('Email is required').email('Enter a valid email'),
      mobile:Yup.string().required('Mobile is required').matches(/^\d{10}$/,'Enter a valid mobile number'),
      description:Yup.string().required('Description is required').min(10,'Description can not be shorter than 10 leters'),
    }),
    onSubmit : async(values, { resetForm }) => {
        try {
          let res = await AxiosService.put(`${ApiRoutes.CONTACTUS.path}`,values)
        //  console.log(res)
          if(res.status === 200){
              toast.success(res.data?.message)
              resetForm()
          }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
  })

  return <>
    <Container className='contactBlock'>
      <Col md xs={12} className='contactForm p-5'>
        <h4 className='text-center'>Contact Us</h4>
        <Form onSubmit={formik.handleSubmit} className='contactQueryForm mx-auto rounded-5'>
          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" id='name' name='userName' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? (<div className='authErrorText'>{formik.errors.name}</div>) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" placeholder="Enter Mobile number" maxLength={10} id="mobile" name='mobile' onChange={formik.handleChange} value={formik.values.mobile} onBlur={formik.handleBlur}/>
            {formik.touched.mobile && formik.errors.mobile ? (<div className='authErrorText'>{formik.errors.mobile}</div>) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder='Enter Query description' name='description' onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur}/>
            {formik.touched.description && formik.errors.description ? (<div className='authErrorText'>{formik.errors.description}</div>) : null}
          </Form.Group>
          <div className="d-grid"><Button variant='primary' className='formBtns' type="submit">Send Query</Button></div>
        </Form>
      </Col>

      <div className='mapBlock p-5'>
        <iframe width="100%" height="100%" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62575.05133734738!2d76.65222171990958!3d11.411849727066063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8bd84b5f3d78d%3A0x179bdb14c93e3f42!2sOoty%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1720637461973!5m2!1sen!2sin"></iframe>
      </div>
    </Container>
  </>
}

export default ContactContent