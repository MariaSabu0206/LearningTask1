import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';
import { Navbar, Form, Nav } from 'react-bootstrap';
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

const Header = ({ onSidebarToggle }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const toggleSidebar = () => {
    const newSidebarState = !showSidebar;
    setShowSidebar(newSidebarState);
    onSidebarToggle(newSidebarState); 
  };

  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="header-container">
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
          <div className="search d-flex">
            <Form.Control type="text" placeholder="Search" />
            <FaSearch className="search-icon" />
          </div>
          <div>
            <IoNotifications className="notify" />
          </div>
          {userData && (
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
                  <div className="profile-dropdown-item item1">{userData.email}</div>
                  <div className="profile-dropdown-item item2" onClick={logout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Navbar>

      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="brand d-flex">
          <LiaRProject className="brandicon" />
          <h3 className="brandname">
            Profitize <GiHamburgerMenu className="hamburger" onClick={toggleSidebar} />
          </h3>
        </div>
        <nav>
          <Nav className="flex-column">
            <NavLink to="/home" className="nav-link"><MdGridView className="nav-icon" /> Dashboard</NavLink>
            <NavLink to="/home/growth" className="nav-link"><BsGraphUp className="nav-icon" /> Growth</NavLink>
            <NavLink to="/home/users" className="nav-link"><MdOutlinePeopleAlt className="nav-icon" /> Users</NavLink>
            <NavLink to="" className="nav-link"><HiOutlineDocumentReport className="nav-icon" /> Reports</NavLink>
            <NavLink to="" className="nav-link"><IoMdText className="nav-icon" /> Support</NavLink>
            <NavLink to="" className="nav-link"><IoSettings className="nav-icon" /> Settings</NavLink>
          </Nav>
        </nav>
      </div>
    </div>
  );
};

export default Header;
