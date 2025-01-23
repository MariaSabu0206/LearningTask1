import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import axiosInstance from './AxiosInstance';
import { toast } from 'react-toastify';
import '../CSS/ProductGrid.css'; 
const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/products')
      .then((response) => {
        setProducts(response.data);
        toast.success('Products fetched successfully!');
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      });
  }, []);

  const handleEdit = (product) => {
    toast.info('Editing product: ' + product.title);
    console.log('Edit product:', product);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast.success('Product deleted successfully!');
  };

  const handleView = (productId) => {
    toast.info('Viewing product with ID: ' + productId);
    console.log('View product with ID:', productId);
  };

  return (
    <div className="product-grid-container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="product-card">
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-card-img"
              />
              <div className="product-card-body">
                <h5 className="product-card-title">{product.title}</h5>
                <p className="product-card-price">${product.price}</p>
              </div>

              {/* Hover actions */}
              <div className="product-card-actions">
                <div className="d-flex justify-content-between cardicons">
                  <FaEdit
                    className="action-icon"
                    onClick={() => handleEdit(product)}
                  />
                  <FaTrash
                    className="action-icon"
                    onClick={() => handleDelete(product.id)}
                  />
                  <IoMdEye
                    className="action-icon"
                    onClick={() => handleView(product.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
