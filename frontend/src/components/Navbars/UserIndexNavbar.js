import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function UserIndexNavbar() {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.username) {
        setUsername(user.username);
      }
    }, []);
  
    useEffect(() => {
      const updateNavbarColor = () => {
        if (document.documentElement.scrollTop > 399 || document.body.scrollTop > 399) {
          setNavbarColor("");
        } else if (document.documentElement.scrollTop < 400 || document.body.scrollTop < 400) {
          setNavbarColor("navbar-transparent");
        }
      };
      window.addEventListener("scroll", updateNavbarColor);
      return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
      };
    });
  
    // Handle logout
    const handleLogout = () => {
      localStorage.removeItem("user");
      window.location.href = "/";
    };
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              to="/index"
              tag={Link}
              id="navbar-brand"
            >
            <img
              alt="Green Future"
              className="main-logo"
              src={require("assets/img/main-logo.png")}
            ></img>
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="#pablo"
                  to="/landing-page"
                  tag={Link}
                >
                  <i className="now-ui-icons ui-2_favourite-28"></i>
                  <p>Our Mission</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Features</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/carbon-footprint-calculator" tag={Link}>
                    <i className="now-ui-icons education_paper mr-1"></i>
                    Carbon Footprint Calculator
                  </DropdownItem>
                  <DropdownItem>
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Blog
                  </DropdownItem>
                  <DropdownItem>
                    <i className="now-ui-icons ui-1_calendar-60 mr-1"></i>
                    Events
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                    className="nav-link btn-neutral"
                    caret
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                  <i className="now-ui-icons users_circle-08 mr-1"></i>
                  <p>{username ? `Hello, ${username}` : "Account"}</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <i className="now-ui-icons users_circle-08 mr-1"></i>
                    Account
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <i className="now-ui-icons ui-1_simple-remove mr-1"></i>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default UserIndexNavbar;
