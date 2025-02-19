import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import axiosInstance from './AxiosInstance';
import { toast } from 'react-toastify';
import { Modal, Form } from 'react-bootstrap';

import '../CSS/ProductGrid.css'; 
import { Link} from 'react-router-dom';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
const ProductGrid = () => {
  const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
   const [newItem, setNewItem] = useState({title: '', price: '', description: '',categoryId:'', images: [''] });

  const navigate = useNavigate();



  const [showEditModal, setShowEditModal] = useState(false);
const [editableProduct, setEditableProduct] = useState({
  id: '',
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: ['']
});

const openEditModal = (product) => {
  setEditableProduct({ ...product });
  setShowEditModal(true);
};

const handleEditSave = () => {
  handleEdit(editableProduct);
  setShowEditModal(false); // Close the modal after saving changes
};





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

 
  const handleAdd = () => {
    axiosInstance
      .post('/products', newItem) // Use the newItem state as the body for the request
      .then((response) => {
        // Update the products list with the newly added product
        setProducts((prevProducts) => [...prevProducts, response.data]);
        toast.success('Product added successfully!');
        setShowAddModal(false); // Close the modal
        setNewItem({ title: '', price: '', description: '', categoryId: '', images: [''] }); // Reset form
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      });
  };
  
  const handleEdit = (product) => {
    const updatedProduct = { 
      title: 'Change title', // You can update specific fields as per requirement
      price: 100 
    };
  
    axiosInstance
      .put(`/products/${product.id}`, updatedProduct) // Update product using its ID
      .then((response) => {
        // Update the product in the products list
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === product.id ? response.data : item
          )
        );
        toast.success('Product updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      });
  };
  
  const handleDelete = (productId) => {
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

  const handleView = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <>
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
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="productPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="productImages">
                  <Form.Label>Category ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Category ID"
                    value={newItem.categoryId}
                    onChange={(e) =>
                      setNewItem({ ...newItem, categoryId: [e.target.value] })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="productImages">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={newItem.images[0]}
                    onChange={(e) =>
                      setNewItem({ ...newItem, images: [e.target.value] })
                    }
                  />
                </Form.Group>           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn"  
          onClick={handleAdd}
          >
            Add Product
          </button>
        </Modal.Footer>
      </Modal>


     
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="editProductTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={editableProduct.title}
          onChange={(e) =>
            setEditableProduct({ ...editableProduct, title: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="editProductPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={editableProduct.price}
          onChange={(e) =>
            setEditableProduct({ ...editableProduct, price: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="editProductDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={editableProduct.description}
          onChange={(e) =>
            setEditableProduct({
              ...editableProduct,
              description: e.target.value
            })
          }
        />
      </Form.Group>
      <Form.Group controlId="editProductCategoryId">
        <Form.Label>Category ID</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Category ID"
          value={editableProduct.categoryId}
          onChange={(e) =>
            setEditableProduct({
              ...editableProduct,
              categoryId: e.target.value
            })
          }
        />
      </Form.Group>
      <Form.Group controlId="editProductImages">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={editableProduct.images[0]}
          onChange={(e) =>
            setEditableProduct({
              ...editableProduct,
              images: [e.target.value]
            })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <button
      className="adduserbtn"
      onClick={handleEditSave} // Save changes and close the modal
    >
      Save Changes
    </button>
  </Modal.Footer>
</Modal>







    <div className="product-grid-container">
        <div className="user-crud-header">
        <h2>
         <MdOutlineProductionQuantityLimits /> Product Management
        </h2>
        <button
          className="adduserbtn"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add Product
        </button>
         <Link to='/products'><i className="bi bi-grid gridicon"></i></Link>
        
      </div>
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
                    onClick={() => openEditModal(product)}
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
    </>
  );
};

export default ProductGrid;
