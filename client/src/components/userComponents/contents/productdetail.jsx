/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Image,
  Spinner,
  Container,
  Row,
  Col,
  Carousel,
} from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CartDataContext } from "../../../contextApi/CartDataComponent";
import AxiosService from "../../../utils/AxiosService";
import ApiRoutes from "../../../utils/ApiRoutes";
import Nav from "../AppNavbar";
import Footer from "../AppFooter";
import "./productdetail.css";
import { jwtDecode } from "jwt-decode";

function ProductDetail() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const { setCart, cart } = useContext(CartDataContext);
  const [quantity, setQuantity] = useState(1);
  const getLoginToken = localStorage.getItem("loginToken");
  const decodedToken = jwtDecode(getLoginToken);
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product) {
        setLoading(true);
        try {
          const response = await AxiosService.get(
            `${ApiRoutes.GETPRODUCTBYID.path}/${productId}`
          );
          if (response.status === 200) {
            const fetchedProduct = response.data.productsData;
            if (fetchedProduct) {
              setProduct(fetchedProduct);
            } else {
              toast.error("Product not found.");
            }
          } else {
            toast.error("Failed to fetch product details.");
          }
        } catch (error) {
          toast.error("An error occurred while fetching product details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [productId, product]);

  const handleAddToCart = async () => {
    try {
      const response = await AxiosService.put(
        `${ApiRoutes.ADDCARTLIST.path}/${productId}/${userId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added to cart successfully.");
        setCart(cart + 1);
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!product) {
    return <div className="no-product">No product details available.</div>;
  }

  return (
    <>
      <Nav />
      <div className="product-detail-page">
        <Container>
          <Row>
            {/* Product Image Section */}
            <Col md={6}>
              <Card className="product-card">
                <Carousel>
                  {product.productImages?.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        height={600}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="product-image"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="quantity-controls">
                  <Button
                    variant="dark"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </Button>
                  <span className="quantity-display">{quantity}</span>
                  <Button
                    variant="dark"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="success"
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>

            {/* Product Information Section */}
            <Col md={6}>
              <Card.Body>
                <h2 className="product-title">{product.productTitle}</h2>
                <p className="product-sku">
                  <strong>SKU:</strong> {product.productSKU}
                </p>
                <div className="product-rating">
                  <div className="stars">★★★★★</div>
                  <span className="rating-text">4.5 (200 reviews)</span>
                </div>
                <p className="product-detail">
                  <strong>Weight:</strong> {product.productWeight}
                </p>
                <p className="product-height">
                  <strong>Height:</strong> {product.productHeight}
                </p>
                <p className="product-description">
                  {product.productDescription}
                </p>
                <h4 className="product-price">
                  {"\u20B9"}
                  {product.productPrice}.00
                </h4>
                <p className="product-old-price">
                  <strong>Old Price:</strong> {"\u20B9"}
                  {product.productOriginalPrice}.00
                </p>
                <p className="product-availability">
                  <strong>Availability:</strong>{" "}
                  {product.isStockAvailable ? "In stock" : "Out of stock"}
                </p>
                <p className="product-category">
                  <strong>Category:</strong> {product.productCategory}
                </p>
                <p className="product-quantity">
                  <strong>Quantity:</strong> {product.productQuantity}
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
