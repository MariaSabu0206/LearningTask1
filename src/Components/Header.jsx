import React, { useState, useContext } from 'react';
import '../CSS/Header.css';
import { Navbar, Form, Nav, Modal } from 'react-bootstrap';
import { LiaRProject } from "react-icons/lia";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdGridView } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdText } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = ({ onSidebarToggle }) => {
  const { user, logout , hasToken } = useContext(UserContext); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    const newSidebarState = !showSidebar;
    setShowSidebar(newSidebarState);
    onSidebarToggle(newSidebarState);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
  };

  

  return (
    <div className="header-container">
      <Modal show={showConfirmModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="delete" onClick={handleLogout}>
            Logout
          </button>
        </Modal.Footer>
      </Modal>

      <Navbar className="bg-body-tertiary navbar">
        <Form inline>
          <div className="brand d-flex">
            <LiaRProject className="brandicon" />
            <h3 className="brandname">
              Profitize <GiHamburgerMenu className="hamburger" onClick={toggleSidebar} />
            </h3>
          </div>
        </Form>
        <div className="d-flex ms-auto">
          {/* Search */}
          <div className="search d-flex">
            <Form.Control type="text" placeholder="Search" />
            <FaSearch className="search-icon" />
          </div>
          {/* Notifications */}
          <div>
            <IoNotifications className="notify" />
          </div>
          {/* Profile Dropdown */}
          {hasToken && (
            <div className="profile-dropdown-container">
              <div
                className="profile-img"
                onClick={toggleProfileDropdown}
                style={{ cursor: 'pointer' }}
              >
                <FaUserCircle size={30} />
              </div>

              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-item item1">{user?.email}</div>
                  <div
                    className="profile-dropdown-item item2"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Navbar>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="brand d-flex">
          <LiaRProject className="brandicon" />
          <h3 className="brandname">
            Profitize <GiHamburgerMenu className="hamburger" onClick={toggleSidebar} />
          </h3>
        </div>
        <nav>
          <Nav className="flex-column">
            <NavLink to="/dashboard" className="nav-link">
              <MdGridView className="nav-icon" /> Dashboard
            </NavLink>
            <NavLink to="/growth" className="nav-link">
              <BsGraphUp className="nav-icon" /> Growth
            </NavLink>
            <NavLink to="/users" className="nav-link">
              <MdOutlinePeopleAlt className="nav-icon" /> Users
            </NavLink>
            <NavLink to="/reports" className="nav-link">
              <HiOutlineDocumentReport className="nav-icon" /> Reports
            </NavLink>
            <NavLink to="" className="nav-link">
              <IoMdText className="nav-icon" /> Support
            </NavLink>
            <NavLink to="" className="nav-link">
              <IoSettings className="nav-icon" /> Settings
            </NavLink>
          </Nav>
        </nav>
      </div>
    </div>
  );
};

export default Header;
