import React, { useEffect, useState } from "react";
import AxiosService from "../../../utils/AxiosService";
import ApiRoutes from "../../../utils/ApiRoutes";
import ProductCard from "../ProductCard"; 
import "./starproduct.css";

export const StarProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchStarProducts = async () => {
    try {
      const path = ApiRoutes.GETALLPRODUCTS.path;
      if (!path) {
        console.error("GETALLPRODUCTS path is undefined");
        return;
      }

      const response = await AxiosService.get(`${path}/random`);
      console.log("API Response:", response);

      if (response.status === 200 && response.data && Array.isArray(response.data.productsList)) {
        const productArrays = response.data.productsList;
        const allProducts = productArrays.flat();
        setProducts(allProducts);
        console.log("All Products:", allProducts);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching star products:", error);
    }
  };

  useEffect(() => {
    fetchStarProducts();
  }, []);

  return (
    <div className="star-products-container">
      <div className="headline-wrapper">
        <h1 className="star-products-headline">
          MENU
          <span className="headline-subtext">You can Find What you Want</span>
        </h1>
      </div>
      <div className="menucard">
        {products.slice(0, 6).map((product, index) => (
          <ProductCard
            cardData={product}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StarProducts;
