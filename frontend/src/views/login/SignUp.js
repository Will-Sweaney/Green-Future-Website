import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Modal,
  ModalBody,
} from "reactstrap";

import SecondaryNavbar from "components/Navbars/SecondaryNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

function SignUp() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [modal2, setModal2] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => console.log('Fetched Data:', data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const validateForm = () => {
    const { username, email, password } = formData;

    if (username.length < 3) {
      setWarningMessage("Username must be at least 3 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setWarningMessage("Please enter a valid email address.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setWarningMessage("Password must be at least 8 characters long, contain one uppercase letter and one number.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setModal2(true);
      return;
    }

    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate('/login-page');
        } else {
          setWarningMessage(data.message);
          setModal2(true);
        }
      })
      .catch((error) => console.error('Error during registration:', error));
  };

  return (
    <>
      <SecondaryNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="section section-signup"
          style={{
            backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Container>
            <Row>
              <Card className="card-signup" data-background-color="blue">
                <Form className="form" onSubmit={handleSubmit}>
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3">
                      Sign Up
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border" + (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border" + (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border" + (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
            <div className="col text-center">
              <Button
                className="btn-round btn-white"
                color="default"
                to="/login-page"
                outline
                size="lg"
                tag={Link}
              >
                View Login Page
              </Button>
            </div>
          </Container>
        </div>
        <TransparentFooter />
      </div>
      <Modal
        modalClassName="modal-mini modal-info"
        toggle={() => setModal2(false)}
        isOpen={modal2}
      >
        <div className="modal-header justify-content-center">
          <div className="modal-profile">
            <i className="now-ui-icons ui-1_bell-53"></i>
          </div>
        </div>
        <ModalBody>
          <p>{warningMessage}</p>
        </ModalBody>
        <div className="modal-footer">
          <Button
            className="btn-neutral"
            color="link"
            type="button"
            onClick={() => setModal2(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SignUp;
