import React, { useContext, useState } from "react";
import { Container, Card, Button, Breadcrumb, Modal, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { UserListContext } from "../../../contextApi/UserListContextComponent";
import AxiosService from "../../../utils/AxiosService";
import ApiRoutes from "../../../utils/ApiRoutes";
import AdminProductCard from "../AdminProductCard";
import "./admin.css";

function AdminProductsContent() {
  const navigate = useNavigate();
  const { products } = useContext(UserListContext);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sku, setSku] = useState("");
  const [desc, setDesc] = useState("");
  const [cate, setCate] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const getAdminToken = localStorage.getItem("adminLoginToken");
  const decodedToken = jwtDecode(getAdminToken);
  const adminId = decodedToken.id;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("sku", sku);
    formData.append("description", desc);
    formData.append("category", cate);
    formData.append("originalPrice", originalPrice);
    formData.append("price", price);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const res = await AxiosService.post(
        `${ApiRoutes.ADMINADDPRODUCT.path}/${adminId}`,
        formData,
        {
          headers: {
            Authorization: getAdminToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product added successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product.");
    }
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const previews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  const resetForm = () => {
    setTitle("");
    setWeight("");
    setHeight("");
    setSku("");
    setDesc("");
    setCate("");
    setOriginalPrice("");
    setPrice("");
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <>
      <Container className="my-5">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Products</Breadcrumb.Item>
        </Breadcrumb>

        <div className="productsArea">
          <div className="d-flex justify-content-between mb-4">
            <h4>Products List</h4>
            <Button onClick={handleShow}>Add Product</Button>
          </div>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <AdminProductCard key={index} product={product} />
              ))
            ) : (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Text>No products found</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Row>
        </div>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-fullscreen"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Form onSubmit={handleAddProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product SKU</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSku(e.target.value)}
                placeholder="Enter SKU"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Weight</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight (e.g., g/kg)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Height</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height (e.g., cm/m)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter product description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCate(e.target.value)}
                placeholder="Enter product category"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Original Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter original price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Product Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="image-preview mt-3">
                {imagePreviews.map((preview, index) => (
                  <Image
                    key={index}
                    src={preview}
                    rounded
                    thumbnail
                    className="me-2 mb-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                ))}
              </div>
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
  );
}

export default AdminProductsContent;
