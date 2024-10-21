import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components
import SecondaryNavbar from "components/Navbars/SecondaryNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

function LoginPage() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted', formData);
  
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Response:', data);
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert(`An error occurred during login: ${error.message}`);
      });
  };
  return (
    <>
      <SecondaryNavbar />
      <div className="page-header clear-filter">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={handleSubmit} className="form">
                  <CardHeader className="text-center">
                  </CardHeader>
                  <h3>
                    Login
                  </h3>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
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
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
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
                    block 
                    className="btn-round" 
                    color="info" 
                    size="lg" 
                    type="submit"
                  >
                    Login
                  </Button>    
                  <div className="pull-left">
                    <h6>
                      <Link to="/signup-page" className="link">
                        Create Account
                      </Link>
                    </h6>
                  </div>
                  <div className="pull-right">
                    <h6>
                      <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                        Need Help?
                      </a>
                    </h6>
                  </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
