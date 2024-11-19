/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Container, Card, Button, Breadcrumb, Modal, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { UserListContext } from '../../../contextApi/UserListContextComponent'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import AdminProductCard from '../AdminProductCard'
import './admin.css';

function AdminProductsContent() {

    let navigate = useNavigate()
    let { products } = useContext(UserListContext)

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [sku, setSku] = useState('')  // SKU state
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [desc, setDesc] = useState('')
    const [cate, setCate] = useState('')
    const [originalPrice, setOrignalPrice] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState([]) // State to hold multiple images

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let getAdminToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getAdminToken)
    let id = decodedToken.id

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('sku', sku)  // Append SKU
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('description', desc)
        formData.append('category', cate)
        formData.append('originalPrice', originalPrice)
        formData.append('price', price)

        // Append all selected images to formData
        images.forEach((image) => {
            formData.append('imagefile', image);
        });

        try {
            let res = await AxiosService.post(`${ApiRoutes.ADMINADDPRODUCT.path}/${id}`, formData, {
                headers: {
                    'Authorization': `${getAdminToken}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            if (res.status === 200) {
                handleClose()
                toast.success('Product added successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return <>
        <Container className='my-5'>

            <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate('/admin/dashboard')}>Dashboard</Breadcrumb.Item>
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
                                products.map((e, i) => {
                                    return <AdminProductCard e={e} key={i} />
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

        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-fullscreen" // Bootstrap class for full-screen modals
            backdrop="static" // Prevent closing when clicking outside
            keyboard={false}  // Disable closing with the Esc key
            centered          // Center the modal content
        >
            <Form onSubmit={handleAddProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    {/* Product Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter product name"
                        />
                    </Form.Group>

                    {/* SKU */}
                    <Form.Group className="mb-3">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            type="text"
                            name="sku"
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="Enter SKU"
                        />
                    </Form.Group>

                    {/* Product Weight */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Weight</Form.Label>
                        <Form.Control
                            type="text"
                            name="weight"
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter weight in g/kg"
                        />
                    </Form.Group>

                    {/* Product Height */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Height</Form.Label>
                        <Form.Control
                            type="text"
                            name="height"
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter height in cm/m"
                        />
                    </Form.Group>

                    {/* Product Description */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Enter description"
                        />
                    </Form.Group>

                    {/* Product Category */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            onChange={(e) => setCate(e.target.value)}
                            placeholder="Enter category"
                        />
                    </Form.Group>

                    {/* Product Original Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Original Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="originalPrice"
                            onChange={(e) => setOrignalPrice(e.target.value)}
                            placeholder="Enter original price"
                        />
                    </Form.Group>

                    {/* Product Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />
                    </Form.Group>

                    {/* Multiple Product Images */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Images</Form.Label>
                        <Form.Control
                            type="file"
                            name="imagefile"
                            onChange={(e) => setImages([...e.target.files])}
                            accept="image/*"
                            multiple
                        />
                        <small className="form-text text-muted">You can upload multiple images (max 10).</small>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    </>
}

export default AdminProductsContent
