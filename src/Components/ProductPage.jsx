import React, { useState, useEffect } from 'react';
import { Table, Modal, Pagination, Form} from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';
import { toast } from 'react-toastify'; // Import toast
import '../CSS/UserCrud.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', categoryId: 1, images: [] });
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle Add Product
  const handleAddProduct = () => {
    setShowAddModal(true);
    setEditingProduct(null);
    setNewProduct({ title: '', price: '', description: '', categoryId: 1, images: [] });
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setShowEditModal(true);
  };

  // Handle View Product (Redirect to Product Detail Page)
  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle Save New Product
  const handleSaveNewProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.images[0]) {
      toast.error("All fields are required!");
      return;
    }

    axiosInstance.post('/products', newProduct)
      .then((response) => {
        setProducts([response.data, ...products]);
        setShowAddModal(false);
        toast.success("Product added successfully!");
      })
      .catch((error) => {
        console.error('Error adding new product:', error);
        toast.error("Failed to add product!");
      });
  };

  // Handle Save Edit Product
  const handleSaveEditProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.images[0]) {
      toast.error("All fields are required!");
      return;
    }

    axiosInstance.put(`/products/${editingProduct.id}`, newProduct)
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        setShowEditModal(false);
        toast.success("Product updated successfully!");
      })
      .catch((error) => {
        console.error('Error editing product:', error);
        toast.error("Failed to update product!");
      });
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId) => {
    axiosInstance.delete(`/products/${productId}`)
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        toast.success("Product deleted successfully!");
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        toast.error("Failed to delete product!");
      });
  };

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-crud-container">
      <div className="user-crud-header">
        <h2>
          <i className="bi bi-grid"></i> Product Management
        </h2>
        <button className="adduserbtn" onClick={handleAddProduct}>
          <FaPlus className="plusicon" /> Add Product
        </button>
      </div>

      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th className="actionscol">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{indexOfFirstProduct + index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="actionrow">
                <div className="d-flex boxdiv">
                  <div className="editbox" onClick={() => handleEditProduct(product)}>
                    <FaEdit className="editbtn" />
                  </div>
                  <div className="deletebox" onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrash className="deletebtn" />
                  </div>
                  <div className="overviewbox" onClick={() => handleViewProduct(product.id)}>
                    <IoMdEye className="eyebtn" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newProduct.images[0]}
                onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn" onClick={handleSaveNewProduct}>
            Add Product
          </button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newProduct.images[0]}
                onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn" onClick={handleSaveEditProduct}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductPage;
