import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import TableViewPage from './TableViewPage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductDataPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      });
  }, []);

  // Handle Add Product
  const handleAddProduct = (newProduct) => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Name and Price are required!');
      return;
    }

    axiosInstance
      .post('/products', { title: newProduct.name, price: newProduct.price })
      .then((response) => {
        setProducts([...products, response.data]);
        toast.success('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      });
  };

  // Handle Edit Product
  const handleEditProduct = (editedProduct) => {
    if (!editedProduct.name || !editedProduct.price) {
      toast.error('Name and Price are required!');
      return;
    }

    axiosInstance
      .put(`/products/${editedProduct.id}`, { title: editedProduct.name, price: editedProduct.price })
      .then(() => {
        const updatedProducts = products.map((product) =>
          product.id === editedProduct.id
            ? { ...product, title: editedProduct.name, price: editedProduct.price }
            : product
        );
        setProducts(updatedProducts);
        toast.success('Product updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      });
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId) => {
    axiosInstance
      .delete(`/products/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
        toast.success('Product deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      });
  };

  // Handle View Product
  const handleViewProduct = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      navigate(`/product/${productId}`);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Actions', accessor: 'actions' },
  ];

  return (
    <TableViewPage
      data={products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
      }))}
      columns={columns}
      onAdd={handleAddProduct}
      onEdit={handleEditProduct}
      onDelete={handleDeleteProduct}
      onView={handleViewProduct}
      modalType="product"
    />
  );
};

export default ProductDataPage;
