import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components

function Navbars() {
  return (
    <>
      <div className="section">
        <Container id="menu-dropdown">
          <Row>
            <Col>
              <h3>Green Future</h3>
                At Green Future, our primary goal is to combat climate change by advocating for sustainable practices across various sectors. We aim to reduce carbon footprints by promoting the use of renewable energy sources, such as solar, wind, and hydroelectric power. By working with local communities, businesses, and policymakers, we strive to facilitate the transition from fossil fuels to cleaner energy alternatives. Our initiatives include workshops, educational programs, and partnerships with renewable energy providers to empower individuals and organizations to make the switch.
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Navbars;
