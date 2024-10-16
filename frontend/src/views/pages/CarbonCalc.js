import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';

// reactstrap components
import {
  Button,
  Label,
  Input,
  FormGroup,
  Container,
  UncontrolledTooltip,
  Row,
  Col,
} from "reactstrap";

import DefaultFooter from "components/Footers/DefaultFooter.js";

function CarbonCalc() {
  
  React.useEffect(() => {
    document.body.classList.add("carbon-footprint-calculator");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("carbon-footprint-calculator");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const [inputClass, setInputClass] = useState('');
  const [distDrivenValue, setDistDrivenValue] = useState('');
  const [fuelType, setFuelType] = useState('petrol');

  const intInputCheck = (e) => {
    const value = e.target.value;
    
    if (/^\d+$/.test(value)) {
      setInputClass('has-success');
    } else if (value === '') {
      setInputClass('');
    } else {
      setInputClass('has-danger');
    }
    setDistDrivenValue(value);
  };
  
  const kgPerKm = fuelType === 'petrol' ? 0.25227 : 0.268


  const yearlyFootprintResult = distDrivenValue ? (parseInt(distDrivenValue) * kgPerKm * 52).toFixed(2) : '';
  const dailyFootprintResult = distDrivenValue ? (parseInt(distDrivenValue) * kgPerKm / 7).toFixed(2) : '';
  
  return (
    <>
      <div className="wrapper">
        <div className="section">
          <Container>
            <div className="button-container">
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
                to="/index"
                tag={Link}
              >
                <i className="now-ui-icons arrows-1_minimal-left"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Return to home
              </UncontrolledTooltip>
            </div>
            <h3 className="title">Carbon Footprint Calculator</h3>
            <h5 className="description">
            This calculator helps you estimate your carbon footprint by analyzing various aspects of your lifestyle, such as energy use, transportation, waste production, and dietary choices. Simply input details about your daily habits, and the calculator will provide an estimate of your total greenhouse gas emissions. You'll also receive suggestions on how to lower your carbon footprint and make more sustainable choices.
            </h5>
            <h5 className="title">Fuel Type</h5>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultChecked
                  defaultValue="option1"
                  value="petrol"
                  id="fuelTypePetrol"
                  name="fuelType"
                  type="radio"
                  onChange={() => setFuelType('petrol')}
                ></Input>
                <span className="form-check-sign"></span>
                Petrol
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="option2"
                  value="diesel"
                  id="fuelTypeDiesel"
                  name="fuelType"
                  type="radio"
                  onChange={() => setFuelType('diesel')}
                ></Input>
                <span className="form-check-sign"></span>
                Diesel
              </Label>
            </FormGroup>
            <h5 className="title">Kilometers Driven Per Week</h5>
            <div id="inputs">
              <FormGroup
                className={inputClass}
                onChange={intInputCheck}
                >
                <Input
                  defaultValue=""
                  placeholder="Distance Driven (km)"
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="nav-align-center">
              <h3 className="title">Average Carbon Footprint Usage</h3>
              <Row className="d-flex justify-content-center align-items-center">
                <Col md="5" className="text-center">
                  <h3>
                    {dailyFootprintResult !== '' && (
                      <p>Daily: {dailyFootprintResult}kg</p>
                    )}
                  </h3>
                </Col>
                <Col md="5" className="text-center">
                  <h3>
                    {yearlyFootprintResult !== '' && (
                      <p>Yearly: {yearlyFootprintResult}kg</p>
                    )}
                  </h3>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default CarbonCalc;
