import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Tabs() {
  const [pills, setPills] = React.useState("1");
  return (
    <>
      <div className="section section-tabs">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <p className="category">What do we do</p>
              <Card>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="blue"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        Educate
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        Measure
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        Protect
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("4");
                        }}
                      >
                        Preserve
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"pills" + pills}
                  >
                    <TabPane tabId="pills1">
                      <p>
                        At Green Future, we prioritize education as a cornerstone of our mission. Through workshops, seminars, and community outreach programs, we provide individuals and organizations with the knowledge and tools they need to understand the importance of sustainability. By empowering people with information on topics such as renewable energy, conservation practices, and waste reduction, we inspire informed decision-making that leads to lasting environmental change.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p>
                        Understanding the impact of our actions is crucial to driving effective change. Green Future employs various methods to measure carbon footprints and environmental impacts at both individual and community levels. We utilize data analytics and reporting tools to assess energy usage, waste production, and resource consumption. This quantitative approach enables us to set clear goals, track progress, and implement strategies that lead to measurable improvements in sustainability.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p>
                        Protecting our planet's natural resources is at the heart of Green Future's initiatives. We engage in conservation efforts that safeguard biodiversity and restore habitats through reforestation and wildlife protection programs. By collaborating with local organizations and stakeholders, we work to establish protected areas and promote sustainable land-use practices, ensuring that our ecosystems remain healthy and resilient for future generations.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p>
                        Preservation goes beyond protection; it involves actively maintaining the integrity of our natural world. Green Future advocates for sustainable practices that minimize human impact on the environment, from reducing plastic waste to promoting eco-friendly products. We run campaigns aimed at encouraging responsible consumption and waste management, fostering a culture of preservation within communities. Through these efforts, we strive to ensure that our planet’s beauty and resources are cherished and sustained for years to come.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
