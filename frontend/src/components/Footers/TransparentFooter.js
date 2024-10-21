/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="/carbon-calculator"
                tag={Link}
              >
                Carbon Calculator
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
            <li>
              <a
                href="#"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Green Future{" "}
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
