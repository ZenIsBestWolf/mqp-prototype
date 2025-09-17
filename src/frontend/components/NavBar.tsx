import React, { FC } from 'react';
import { Nav, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';

export const NavBar: FC = () => {
  return (
    <Navbar>
      <Nav>
        {/* Dummy links */}
        <NavLink href="#">Help</NavLink>
        <NavLink href="#">Community</NavLink>
        {/* Disabled to represent that this is the current page. */}
        <NavLink href="#" disabled>
          Status
        </NavLink>
      </Nav>
      <NavbarBrand className="mx-auto">
        <MaterialIcon className="align-text-top" name="account_balance" />
        <span className="ps-1">A Bank</span>
      </NavbarBrand>
      <Nav>
        <NavLink href="#">BankWebsite.com</NavLink>
        <NavLink href="#">Subscribe to Updates</NavLink>
      </Nav>
    </Navbar>
  );
};
