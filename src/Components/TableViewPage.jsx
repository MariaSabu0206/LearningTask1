import React, { useState } from 'react';
import { Table, Pagination, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserCog } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { toast } from 'react-toastify';
import '../CSS/UserCrud.css'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Link } from 'react-router-dom';

const TableViewPage = ({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onView,
  modalType,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState(
    modalType === 'user'
      ? { name: '', email: '',password:'' , avatar:'' }
      : { title: '', price: '', description: '',categoryId:'', images: [''] }
  );

  const itemsPerPage = 10;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAdd = () => {
    if (modalType === 'user' && (!newItem.name || !newItem.email)) {
      toast.error('Name and Email are required!');
      return;
    }
    if (
      modalType === 'product' &&
      (!newItem.title || !newItem.price || !newItem.description || !newItem.images[0])
    ) {
      toast.error('All fields are required for products!');
      return;
    }

    onAdd(newItem);
    setShowAddModal(false);
    toast.success(`${modalType === 'user' ? 'User' : 'Product'} added successfully!`);
    setNewItem(
      modalType === 'user'
        ? { name: '', email: '' }
        : { title: '', price: '', description: '', images: [''] }
    );
  };

  const handleEdit = () => {
    // if (modalType === 'user' && (!newItem.name || !newItem.email)) {
    //   toast.error('Name and Email are required!');
    //   return;
    // }
    // if (
    //   modalType === 'product' &&
    //   (!newItem.title || !newItem.price || !newItem.description || !newItem.images[0])
    // ) {
    //   toast.error('All fields are required for products!');
    //   return;
    // }

    onEdit(editingItem.id, newItem);
    setShowEditModal(false);
    toast.success(`${modalType === 'user' ? 'User' : 'Product'} updated successfully!`);
    setEditingItem(null);
    setNewItem(
      modalType === 'user'
        ? { name: '', email: '' }
        : { title: '', price: '' }
    );
  };

  return (
    <div className="user-crud-container">
      <div className="user-crud-header">
        <h2>
        {modalType === 'user' ? <FaUserCog className="usermanagement-icon" /> : <MdOutlineProductionQuantityLimits />}  {modalType === 'user' ? 'User' : 'Product'} Management
        </h2>
        <button
          className="adduserbtn"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add {modalType === 'user' ? 'User' : 'Product'}
        </button>
         {modalType === 'user' ? '' : <Link to='/productgrid'><i className="bi bi-grid gridicon"></i></Link>}
        
      </div>

      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.name || item.title}</td>
              <td>{item.email || item.price}</td>
              <td className="actionrow">
                <div className="d-flex boxdiv">
                  <div
                    className="editbox"
                    onClick={() => {
                      setEditingItem(item);
                      setNewItem(item);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit className="editbtn" />
                  </div>
                  <div className="deletebox" onClick={() => onDelete(item.id)}>
                    <FaTrash className="deletebtn" />
                  </div>
                  <div className="overviewbox" onClick={() => onView(item.id)}>
                    <IoMdEye className="eyebtn" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add {modalType === 'user' ? 'User' : 'Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === 'user' && (
              <>
                <Form.Group controlId="userName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="userEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newItem.email}
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="userPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={newItem.password}
                    onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="userImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Upload image"
                    value={newItem.avatar}
                    onChange={(e) => setNewItem({ ...newItem, avatar: e.target.value })}
                    />
                </Form.Group>
    
              </>
            )}
            {modalType === 'product' && (
              <>
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
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn" onClick={handleAdd}>
            Add {modalType === 'user' ? 'User' : 'Product'}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {modalType === 'user' ? 'User' : 'Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === 'user' && (
              <>
                <Form.Group controlId="userName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="userEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newItem.email}
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                  />
                </Form.Group>
              </>
            )}
            {modalType === 'product' && (
              <>
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

              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn" onClick={handleEdit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableViewPage;
