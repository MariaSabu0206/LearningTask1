import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import TableViewPage from './TableViewPage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserDataPage = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axiosInstance
      .get('/users')
      .then((response) => {
        setUsers(response.data);
       
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      });
  }, []);

  // Handle Add User
  const handleAddUser = (newUser) => {
    if (!newUser.name || !newUser.email) {
      toast.error('Name and Email are required!');

      return;
      
    }

    axiosInstance
      .post('/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        toast.success('User added successfully!');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
      });
  };

  // Handle Edit User
  const handleEditUser = (editedUser) => {
    // if (!editedUser.name || !editedUser.email) {
    // //   toast.error('Name and Email are required!');
    //   return;
    // }

    axiosInstance
      .put(`/users/${editedUser.id}`, editedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        toast.success('User updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Failed to update user');
      });
  };

  // Handle Delete User
  const handleDeleteUser = (userId) => {
    axiosInstance
      .delete(`/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        toast.success('User deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      });
  };

  // Handle View User
  const handleViewUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      toast.info(`Viewing User: ${user.name}`);
      navigate(`/user/${userId}`);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Actions', accessor: 'actions' },
  ];

  return (
    <TableViewPage
      data={users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))}
      columns={columns}
      onAdd={handleAddUser}
      onEdit={handleEditUser}
      onDelete={handleDeleteUser}
      onView={handleViewUser}
      modalType="user"
    />
  );
};

export default UserDataPage;
