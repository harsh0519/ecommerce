import React, { useState } from "react";
import { Carousel, Button, Col, Card, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // Import custom CSS for additional styling

function ProductCard({ cardData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    navigate(`/productdetails/${cardData._id}`);
  };

  return (
    <Col>
      <Card className="custom-product-card">
        <div className="image-container">
          {cardData.productImage && cardData.productImage.length > 0 ? (
            <Carousel>
              {cardData.productImage.map((img, index) => (
                <Carousel.Item key={index}>
                  <Image
                    height={180}
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    style={{ borderRadius: '5px', width: '100%' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Image
              src={`${cardData.productImage}`}
              alt={cardData.productTitle}
              className="product-image"
            />
          )}
        </div>
        <Card.Body className="custom-card-body">
          <h5 className="product-title">
            {cardData.productTitle}
            <span className="product-weight"> ({cardData.productWeight})</span>
            <span className="product-weight"> ({cardData.productHeight})</span>
          </h5>
          <p className="product-description">{cardData.productDescription}</p>
          <h5 className="product-price">
            {"\u20B9"}
            {cardData.productPrice}.00/-
          </h5>
          <Button
            variant="outline-primary"
            className="details-button"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" /> : "View Details"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
