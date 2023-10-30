import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarHeader,
  } from 'cdbreact';
const Layout = () => {
    //console.log(localStorage.getItem('token'));
    const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      }
    }, []);
    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    return (
        <div>
        <div style={{ display: 'flex', height: '100vh'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ position: "fixed"}} >
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          {/* <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a> */}
          <h4 className="text-decoration-none" style={{ color: 'inherit' }}>Sidebar</h4>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <Link to="home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </Link>
            <Link to="posting" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Tambah Posting</CDBSidebarMenuItem>
            </Link>
            <Link to="search" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
            </Link>
            <Link to="profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="person">Profile</CDBSidebarMenuItem>
            </Link>
            <Link to="logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Logout</CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <main style={{ flex: 1, padding: '20px', paddingLeft:'110px' }}>
      {<Outlet />}
      </main>
    </div>
    </div>
    );
}

export default Layout;
