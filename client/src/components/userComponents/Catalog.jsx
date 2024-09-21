import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import ProductCard from '../../components/userComponents/ProductCard';
import { Container, Row } from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  const [productListData, setProductListData] = useState([]);

  const listProductByCategory = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.PRODUCTBYCATEGORY.path}/${id}`);
      if (res.status === 200) {
        setProductListData(res.data.productsList);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    listProductByCategory();
  }, [id]);

  return (
    <Container className="my-4">
      <h4>Products for Category: {id}</h4>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {productListData.map((product, i) => (
          <ProductCard key={i} cardData={product} />
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
