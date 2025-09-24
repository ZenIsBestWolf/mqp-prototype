import React, { FC, useState } from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import { SiteSettings } from './SiteSettings';
import { HorizontalStack } from './Stacks';
import { SubscribeButton } from './SubscribeButton';

export const NavBar: FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar className="navbar-expand-sm">
      <NavbarBrand>
        <MaterialIcon className="align-text-top" name="account_balance" />
        <span className="ps-1">Bank</span>
      </NavbarBrand>
      <Button
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="navbar-toggler"
      >
        <MaterialIcon name="menu" />
      </Button>
      <Collapse isOpen={expanded} navbar>
        <Nav className="ms-auto">
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
      </Collapse>
    </Navbar>
  );
};
