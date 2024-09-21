import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { CartDataContext } from "../../../contextApi/CartDataComponent";
import ProductCard from "../ProductCard";
import AxiosService from "../../../utils/AxiosService";
import ApiRoutes from "../../../utils/ApiRoutes";

function BuyProductContent() {
  let { cart, setCart } = useContext(CartDataContext);
  const [productCardData, setProductCardData] = useState([]);
  const [categoryId, setCategoryId] = useState("Male"); // Initialize with a default category

  const getProductsData = async () => {
    try {
      let res = await AxiosService.get(
        `${ApiRoutes.PRODUCTBYCATEGORY.path}/${categoryId}`
      );
      if (res.status === 200) {
        setProductCardData(res.data.productsList);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [categoryId]); // Fetch products when the categoryId changes

  return (
    <>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>PRODUCTS LIST</h4>
        </div>
        <div
          className="my-4 p-2"
          style={{
            display: "flex",
            gap: "20px" /* Adjust the gap between buttons */,
            flexWrap: "wrap" /* Allow buttons to wrap if needed */,
          }}
        >
          <Button variant="primary" onClick={() => setCategoryId("Male")}>
            Male
          </Button>
          <Button variant="primary" onClick={() => setCategoryId("Female")}>
            Female
          </Button>
          <Button variant="primary" onClick={() => setCategoryId("Kids")}>
            Kids
          </Button>
          {/* Add more categories as needed */}
        </div>

        <div className="productCard mt-4">
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {productCardData &&
              productCardData.map((e, i) => {
                return (
                  <ProductCard
                    cart={cart}
                    setCart={setCart}
                    cardData={e}
                    key={i}
                  />
                );
              })}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default BuyProductContent;
