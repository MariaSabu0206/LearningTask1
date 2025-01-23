import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../CSS/ProductDetail.css'

const ProductDetailPage = () => {
  const { productId } = useParams();
  console.log('Product ID:', productId);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
        console.error('Product ID is missing');
        return;
      }
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);  
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);


  if (loading) {
    return <div className="loading">Loading product...</div>;  
  }

  if (!product) {
    return <div className="loading">Product not found.</div>;  
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h2>Product Details</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> Go Back
        </button>
      </div>

      <div className="product-info">
        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'} 
          alt="Product" 
          className="product-image" 
        />
        <div className="product-details">
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category ? product.category.name : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
