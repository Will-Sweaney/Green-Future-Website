/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="/index"
                  tag={Link}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  tag={Link}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/landing-page"
                  tag={Link}
                >
                  Our Mission
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Green Future{" "}
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
