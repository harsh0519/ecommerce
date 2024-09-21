import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AxiosService from "../../../utils/AxiosService.jsx";
import ApiRoutes from "../../../utils/ApiRoutes.jsx";
import ProductCard from "../../../components/userComponents/ProductCard.jsx";
import AppNavbar from "../../../components/userComponents/AppNavbar.jsx";
import AppFooter from "../../../components/userComponents/AppFooter.jsx";

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await AxiosService.get(`${ApiRoutes.SEARCH.path}`, {
          params: { query },
        });
        setResults(res.data.productsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <AppNavbar />
      <Container className="mt-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : results.length > 0 ? (
          <Row>
            {results.map((product) => (
              <Col key={product._id} md={4} sm={6} className="mb-4">
                <ProductCard cardData={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </Container>
      <AppFooter />
    </>
  );
};

export default SearchResult;
