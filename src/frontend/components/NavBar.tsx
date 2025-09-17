import React, { FC } from 'react';
import { Button, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';

export const NavBar: FC = () => {
  return (
    <Navbar>
      <NavbarBrand className="me-auto">
        <MaterialIcon className="align-text-top" name="account_balance" />
        <span className="ps-1">Bank</span>
      </NavbarBrand>
      <Nav>
        <NavItem>
          <Button color="primary">Subscribe to Updates</Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
