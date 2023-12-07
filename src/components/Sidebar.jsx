import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import logo from '../assets/w-logo.png';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden',  box_sizing: 'border-box' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt=""
              style={{ width: '150px', margin: "auto" }}
            />
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/associado" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Associado</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/pagamento" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="money-check-alt">Pagamento</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/grupo-de-estudo" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="university">Grupo de Estudo</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sign-in-alt">Sair</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Versão 0.1.0
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;