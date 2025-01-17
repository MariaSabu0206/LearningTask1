import React, { useState, useContext, useEffect } from 'react';
import { Form, Table, Modal, Pagination } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import '../CSS/UserCrud.css';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import axiosInstance from './AxiosInstance';

const UserCrud = () => {
  const { users, setUsers } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', avatar: '' });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPage'), 10) || 1
  );
  const itemsPerPage = 10;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    localStorage.setItem('currentPage', currentPage);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      axiosInstance.get('/users')
        .then((response) => {
          if (Array.isArray(response.data)) {
            setUsers(response.data);
            localStorage.setItem('users', JSON.stringify(response.data));
          } else {
            console.error('Invalid data format:');
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          toast.error('Error fetching users.', { position: 'top-right', autoClose: 3000 });
        });
    }
  },[setUsers,currentPage] );

  // useEffect(() => {
  //   localStorage.setItem('currentPage', currentPage);
  // }, [currentPage]);

  const handleAddUser = () => {
    setShowModal(true);
    setEditingUser(null);
    setNewUser({ name: '', email: '', password: '', avatar: '' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
    });
    setShowModal(true);
  };

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleSaveUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9]{5,}$/;
  
    const userName = newUser?.name?.trim() || '';
    const userEmail = newUser?.email?.trim() || '';
    const userPassword = newUser?.password?.trim() || '';
    const userAvatar = newUser?.avatar?.trim() || '';

    if (!userName && !userEmail && !userPassword && !userAvatar) {
      toast.error('All fields are required.', { position: 'top-right', autoClose: 3000 });
      return;
    }
  
    if (!userName) {
      toast.error('Please enter a valid name.', { position: 'top-right', autoClose: 3000 });
      return;
    }
  
    if (!emailRegex.test(userEmail)) {
      toast.error('Please enter a valid email address.', { position: 'top-right', autoClose: 3000 });
      return;
    }
  
    if (!editingUser && !passwordRegex.test(userPassword)) {
      toast.error('Password must contain letters or numbers only and be at least 5 characters long.', { position: 'top-right', autoClose: 3000 });
      return;
    }
  
    if (!editingUser && !userAvatar) {
      toast.error('Please enter an image URL for your profile.', { position: 'top-right', autoClose: 3000 });
      return;
    }
  
    if (editingUser) {
      axiosInstance.put(`/users/${editingUser.id}`, {
        name: userName,
        email: userEmail,
        avatar: userAvatar,
      })
        .then((response) => {
          const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? response.data : user
          );
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          toast.success('User details edited successfully.', { position: 'top-right', autoClose: 3000 });
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error editing user:', error);
          toast.error('Error editing user.', { position: 'top-right', autoClose: 3000 });
        });
    } else {
      axiosInstance.post('/users/', {
        name: userName,
        email: userEmail,
        password: userPassword,
        avatar: userAvatar,
      })
        .then((response) => {
          const updatedUsers = [response.data, ...users];
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          setCurrentPage(1); 
          localStorage.setItem('currentPage', '1'); 
          toast.success('New user added successfully.', { position: 'top-right', autoClose: 3000 });
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error adding new user:', error);
          toast.error('Error adding new user.', { position: 'top-right', autoClose: 3000 });
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteUser = () => {
    axiosInstance.delete(`/users/${userToDelete}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userToDelete);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setShowConfirmModal(false);
        toast.success('User removed successfully.', { position: 'top-right', autoClose: 3000 });
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user.', { position: 'top-right', autoClose: 3000 });
      });
  };

  const confirmDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="user-crud-container">
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
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actionrow">
                <div className="d-flex boxdiv">
                  <div className="editbox" onClick={() => handleEditUser(user)}>
                    <FaEdit className="editbtn" />
                  </div>
                  <div className="deletebox" onClick={() => confirmDelete(user.id)}>
                    <FaTrash className="deletebtn" />
                  </div>
                  <div className="overviewbox" onClick={() => handleViewUser(user.id)}>
                    <IoMdEye className="eyebtn" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="delete" onClick={handleDeleteUser}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
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
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            {!editingUser && (
              <>
                <Form.Group controlId="userPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="userImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Upload image"
                    value={newUser.avatar}
                    onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                  />
                </Form.Group>
              </>
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
