import React, { useState, useContext } from 'react';
import { Form, Table, Modal, Pagination } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import '../CSS/UserCrud.css';
import { IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from "react-icons/fa";
import { UserContext } from './UserContext';
import { toast, ToastContainer } from 'react-toastify';

const UserCrud = () => {
  const { users, setUsers } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleAddUser = () => {
    setShowModal(true);
    setEditingUser(null);
    setNewUser({ name: '', email: '' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.firstName, email: user.email });
    setShowModal(true);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleSaveUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expression for email
    if (editingUser) {
      const updatedUsers = users.map((user, index) =>
        index === editingUser.index ? { ...user, firstName: newUser.name, email: newUser.email }: user);
      setUsers(updatedUsers);
      setErrorMessage("");
    } else {
      if (newUser.name && newUser.email) {
      const newUserData = {
        firstName: newUser.name,
        email: newUser.email,
      };
      setUsers([...users, newUserData]);
      setErrorMessage("");
    }
    else  {
      if (!newUser.name.trim() && !newUser.name.trim()) {
        toast.error("Please enter the details", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    if (!newUser.name.trim()) {
      toast.error("Please enter a valid name.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!emailRegex.test(newUser.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  }
}
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    
    <div className="user-crud-container">
      <ToastContainer/>
      <div className="user-crud-header">
        <h2>
          <FaUserCog className="usermanagement-icon" /> User Management
        </h2>
        <button className="adduserbtn" onClick={handleAddUser}>
          <FaPlus className="plusicon" /> Add User
        </button>
      </div>

      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th className="actionscol">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td className="actionrow">
                <div className="d-flex boxdiv">
                  <div className="editbox" onClick={() => handleEditUser({ ...user, index })}>
                    <FaEdit className="editbtn"/>
                  </div>   
                  <div className="deletebox" onClick={() => handleDeleteUser(indexOfFirstUser + index)}>
                    <FaTrash className="deletebtn" />
                  </div>    
                  <div className="overviewbox" onClick={() => handleViewUser(indexOfFirstUser + index + 1)}>
                    <IoMdEye className="eyebtn"/>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(users.length / itemsPerPage) },(_, i) => 
           (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
           )
        )}
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            {errorMessage && (
             <div className="error-message">
                   {errorMessage}
             </div>
             )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="adduserbtn" onClick={handleSaveUser}>
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>     
       </Modal.Footer>
      </Modal>
    </div>
  
  );
};

export default UserCrud;
