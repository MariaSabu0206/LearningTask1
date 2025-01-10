import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/UserDetail.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { UserContext } from './UserContext';

const UserDetail = () => {
  const { userId } = useParams(); 
  const { users } = useContext(UserContext); 
  const navigate = useNavigate();

  
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return <div className="loading">User not found...</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <h2>User Details</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> Go Back
        </button>
      </div>

      <div className="user-info">
        <img src={user.image || 'https://via.placeholder.com/150'} alt="User" className="user-image" />
        <div className="user-details">
          <p><strong>Full Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {`${user.address.address}, ${user.address.city}, ${user.address.state} (${user.address.country})`}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Job Title:</strong> {user.company.title}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
