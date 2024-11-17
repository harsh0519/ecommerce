// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Image,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CartDataContext } from "../../../contextApi/CartDataComponent";
import AxiosService from "../../../utils/AxiosService";
import ApiRoutes from "../../../utils/ApiRoutes";
import Nav from "../AppNavbar"
import Footer from "../AppFooter"
import "./productdetail.css";
import { jwtDecode } from "jwt-decode";

function ProductDetail() {
  const { id: productId } = useParams(); 
  console.log(productId)
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
          console.log("Product Detail Response:", response.data.productsData);

          if (response.status === 200) {
            const fetchedProduct = response.data.productsData;
            if (fetchedProduct) {
              setProduct(fetchedProduct);
            } else {
              toast.error("Product not found.");
            }
          } else {
            console.error("Failed to fetch product details:", response.data);
            toast.error("Failed to fetch product details.");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
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
        console.error("Failed to add product to cart:", response);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
      console.error("Error adding to cart:", error);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  if (loading) {
    return <Spinner animation="border" className="loading-spinner" />;
  }

  if (!product) {
    return <div>No product details available.</div>;
  }

  const imageUrl = product.productImage
    ? `${product.productImage}`
    : "/path/to/default/image.jpg";

  return (
    <>
    <Nav/>
    <div className="product-detail-fullpage">
      <Container className="product-detail-container">
        <Button
          variant="link"
          onClick={() => navigate("/")}
          className="back-to-home-btn"
        >
          ← Back to Home
        </Button>
        <Row>
          <Col md={6} className="product-image-section">
            <Card className="product-detail-card">
              <Image
                height={300}
                src={imageUrl}
                style={{ width: "100%",border:"none" , objectFit:"cover"}}
                alt={product.productTitle}
              />
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
                style={{ marginTop: "10px" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
          <Col md={6} className="product-info-section">
            <Card.Body>
              <h2 className="product-title">{product.productTitle}</h2>
              <div className="product-rating">
                <div className="stars">
                  ★★★★★
                </div>
                <span className="rating-text">4.5 (200 reviews)</span>
              </div>
              <p className="product-description">
                {product.productDescription}
              </p>
              <h4 className="product-price">
                {"\u20B9"}
                {product.productPrice}.00
              </h4>
              <p className="product-old-price">
                Old Price: {"\u20B9"}
                {product.productOriginalPrice}.00
              </p>
              <p className="product-availability">
                Availability:{" "}
                {product.isStockAvailable ? "In stock" : "Out of stock"}
              </p>
              <p className="product-category">
                Category: {product.productCategory}
              </p>
              <p className="product-quantity">
                Quantity: {product.productQuantity}
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default ProductDetail;
