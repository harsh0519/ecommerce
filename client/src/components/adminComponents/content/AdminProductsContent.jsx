import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, Button, Breadcrumb, Modal, Form, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { UserListContext } from '../../../contextApi/UserListContextComponent'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import AdminProductCard from '../AdminProductCard'

function AdminProductsContent() {

    let navigate = useNavigate()
    let { products } = useContext(UserListContext)

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [desc, setDesc] = useState('')
    const [cate, setCate] = useState('')
    const [originalPrice, setOrignalPrice] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let getAdminToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getAdminToken)
    let id = decodedToken.id

    const handleAddProduct = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('description', desc)
        formData.append('category', cate)
        formData.append('originalPrice', originalPrice)
        formData.append('price', price)
        formData.append('imagefile', image)
        try {
            let res = await AxiosService.post(`${ApiRoutes.ADMINADDPRODUCT.path}/${id}`,formData, { headers : {
                'Authorization' : `${getAdminToken}`,
                "Content-Type" : 'multipart/form-data'
            } })
            if(res.status === 200) {
                handleClose()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }

    }

    return <>
        <Container className='my-5'>

            <Breadcrumb>
                <Breadcrumb.Item onClick={ ()=> navigate('/admin/dashboard')}>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Products</Breadcrumb.Item>
            </Breadcrumb>

            <div className='productsArea'>
                <div className='d-flex justify-content-between mb-4'>
                    <h4>Products List</h4>
                    <Button onClick={handleShow}>Add Product</Button>
                </div>
                <div>
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {
                        products.length > 0 ? 
                            products.map((e,i) => {
                                return <AdminProductCard e={e} key={i}/>
                            }) 
                            : 
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Text>No products Found</Card.Text>
                                </Card.Body>
                            </Card>
                    }
                    </Row>
                </div>
            </div>
        </Container>

        <Modal show={show} onHide={handleClose} fullscreen>
            <Form onSubmit={handleAddProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="text" name='title' onChange={(e)=> setTitle(e.target.value)} placeholder="Enter product name"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Weight</Form.Label>
                        <Form.Control type="text" name='weight' onChange={(e)=> setWeight(e.target.value)} placeholder="Enter weighs in g/kg"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Height</Form.Label>
                        <Form.Control type="text" name='height' onChange={(e)=> setHeight(e.target.value)} placeholder="Enter Height in cm/m"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control type="text" name='description' onChange={(e)=> setDesc(e.target.value)} placeholder="Enter Description"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control type="text" name='category' onChange={(e)=> setCate(e.target.value)} placeholder="Enter Category"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Orignal Price</Form.Label>
                        <Form.Control type="text" name='orignalprice' onChange={(e)=> setOrignalPrice(e.target.value)} placeholder="Enter Price"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="text" name='price' onChange={(e)=> setPrice(e.target.value)} placeholder="Enter Price"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Image<span style={{fontSize:'small'}}>(Name should not contain space)</span></Form.Label>
                        <Form.Control type="file" name='imagefile' onChange={(e)=> setImage(e.target.files[0])} accept="image/*"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type='submit'>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default AdminProductsContent