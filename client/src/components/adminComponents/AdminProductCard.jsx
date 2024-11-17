import React, { useState } from 'react'
import { Card, Image, Col, Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminProductCard({ e }) {

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [desc, setDesc] = useState('')
    const [cate, setCate] = useState('')
    const [Orignalprice, setOrignalPrice] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [id, setId] = useState();
    let getAdminLoginToken = localStorage.getItem('adminLoginToken')

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setShow(true)
        setId(id)
    }

    const handleEditProduct = async (e, pId) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('description', desc)
        formData.append('category', cate)
        formData.append('orignalPrice', Orignalprice)
        formData.append('price', price)
        formData.append('imagefile', image)
        try {
            let res = await AxiosService.put(`${ApiRoutes.ADMINEDITPRODUCT.path}/${pId}`, formData, {
                headers: {
                    'Authorization': `${getAdminLoginToken}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            if (res.status === 200) {
                handleClose()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleDeleteProduct = async (pId) => {
        try {
            let res = await AxiosService.delete(`${ApiRoutes.ADMINDELETEPRODUCT.path}/${pId}`, {
                headers: {
                    'Authorization': `${getAdminLoginToken}`
                }
            })
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Col>
            <Card style={{ width: '18rem', border: "none", borderRadius: "5px", boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <Image height={180} src={`${e.productImage}`} style={{ borderRadius: "5px" }} />
                {/* <Image height={180} src={`${import.meta.env.VITE_API_BASE_URL}/${e.productImage}`} style={{borderRadius : "5px"}}/>*/}
                <Card.Body className='productCardBody'>
                    <h5 className='text-center'>{e.productTitle}<span style={{ fontSize: "smaller" }}>({e.productWeight})</span><span style={{ fontSize: "smaller" }}>({e.productHeight})</span></h5>
                    <p className='text-center'>{e.productDescription}</p>
                    <div className='d-flex justify-content-around'>
                        <Button variant="secondary" onClick={() => handleShow(e._id)}>Edit Product</Button>
                        <Button variant="danger" onClick={() => handleDeleteProduct(e._id)}>Delete Product</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>

        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={(e) => handleEditProduct(e, id)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="text" name='title' defaultValue={e.productTitle} onChange={(e) => setTitle(e.target.value)} placeholder="Enter product name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Weight</Form.Label>
                        <Form.Control type="text" name='weight' defaultValue={e.productWeight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter weighs in g/kg" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Height</Form.Label>
                        <Form.Control type="text" name='weight' defaultValue={e.productHeight} onChange={(e) => setHeight(e.target.value)} placeholder="Enter weighs in cm/m" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control type="text" name='category' defaultValue={e.category} onChange={(e) => setCate(e.target.value)} placeholder="Enter category" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control type="text" name='description' defaultValue={e.productDescription} onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Image<span style={{ fontSize: 'small' }}>(Name should not contain space)</span></Form.Label>
                        <Form.Control type="file" name='imagefile' onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
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

export default AdminProductCard