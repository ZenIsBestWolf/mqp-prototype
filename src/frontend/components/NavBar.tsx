import React, { FC } from 'react';
import { Button, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import { SiteSettings } from './SiteSettings';
import { HorizontalStack } from './Stacks';
import { SubscribeButton } from './SubscribeButton';

export const NavBar: FC = () => {
  return (
    <Navbar>
      <NavbarBrand className="me-auto">
        <MaterialIcon className="align-text-top" name="account_balance" />
        <span className="ps-1">Bank</span>
      </NavbarBrand>
      <Nav>
        <HorizontalStack gap={2}>
          <NavItem>
            <Button
              rel="noreferrer"
              target="_blank"
              tag="a"
              href="https://github.com/ZenIsBestWolf/mqp-prototype"
              color="dark"
            >
              <MaterialIcon name="code" /> View Source
            </Button>
          </NavItem>
          <NavItem>
            <SiteSettings />
          </NavItem>
          <NavItem>
            <SubscribeButton />
          </NavItem>
        </HorizontalStack>
      </Nav>
    </Navbar>
  );
};
