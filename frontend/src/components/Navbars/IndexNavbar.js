import React from "react";
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

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
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
                  <DropdownItem to="/blog" tag={Link}>
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Blog
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
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
                  <i className="now-ui-icons objects_key-25 mr-1"></i>
                  <p>Login</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/login-page" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Login
                  </DropdownItem>
                  <DropdownItem to="/signup-page" tag={Link}>
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Sign Up
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

export default IndexNavbar;
