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
  Badge
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
  const [waterUsageValue, setWaterUsageValue] = useState('');
  const [electricityUsageValue, setElectricityUsageValue] = useState('');

  const intInputCheck = (e, setState) => {
    const value = e.target.value;
    
    if (/^\d+$/.test(value)) {
      setInputClass('has-success');
    } else if (value === '') {
      setInputClass('');
    } else {
      setInputClass('has-danger');
    }
    setState(value);
  };

  const kgPerKm = fuelType === 'petrol' ? 0.25227 : 0.268;
  const waterKgPerLiter = 0.001;
  const electricityKgPerKWh = 0.475;

  const weeklyFuelFootprint = distDrivenValue ? (parseInt(distDrivenValue) * kgPerKm).toFixed(2) : 0;
  const weeklyWaterFootprint = waterUsageValue ? (parseInt(waterUsageValue) * waterKgPerLiter).toFixed(2) : 0;
  const weeklyElectricityFootprint = electricityUsageValue ? (parseInt(electricityUsageValue) * electricityKgPerKWh).toFixed(2) : 0;

  const totalWeeklyFootprint = (parseFloat(weeklyFuelFootprint) + parseFloat(weeklyWaterFootprint) + parseFloat(weeklyElectricityFootprint)).toFixed(2);
  
  const totalDailyFootprint = (parseFloat(totalWeeklyFootprint) / 7).toFixed(2);
  const totalYearlyFootprint = (parseFloat(totalWeeklyFootprint) * 52).toFixed(2);

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
            This calculator helps you estimate your carbon footprint by analyzing various aspects of your lifestyle, such as energy use, transportation, and water usage. Simply input details about your weekly activities, and the calculator will provide an estimate of your total greenhouse gas emissions.
            </h5>
            <h5 className="title">Vehicle Fuel Type</h5>
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
                <UncontrolledTooltip delay={0} target="fuelTypePetrol">
                  On average, cars in the U.S. emit about 404 grams of CO2 per mile driven.
                </UncontrolledTooltip>
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
                <UncontrolledTooltip delay={0} target="fuelTypeDiesel">
                  On average, diesel vehicles emit about 2.68 kg of CO2 per liter of fuel burned.
                </UncontrolledTooltip>
                <span className="form-check-sign"></span>
                Diesel
              </Label>
            </FormGroup>
            <h5 className="title">Distance Driven Per Week (km)</h5>
            <FormGroup
              className={inputClass}
              onChange={(e) => intInputCheck(e, setDistDrivenValue)}
            >
              <Input
                defaultValue=""
                placeholder="Distance Driven (km)"
                type="text"
              />
            </FormGroup>
            <h5 className="title">Water Usage Per Week (Liters)</h5>
            <FormGroup
              className={inputClass}
              onChange={(e) => intInputCheck(e, setWaterUsageValue)}
            >
              <Input
                defaultValue=""
                placeholder="Water Usage (Liters)"
                type="text"
              />
            </FormGroup>

            <h5 className="title">Electricity Usage Per Week (kWh)</h5>
            <FormGroup
              className={inputClass}
              onChange={(e) => intInputCheck(e, setElectricityUsageValue)}
            >
              <Input
                defaultValue=""
                placeholder="Electricity Usage (kWh)"
                type="text"
              />
            </FormGroup>
            <div className="nav-align-center">
              {totalDailyFootprint > 0 && (
                <>
                  <h3 className="title">Total Carbon Footprint</h3>
                  {totalDailyFootprint >= 0 && totalDailyFootprint <= 5 && (
                    <Badge color="success" className="mr-1">
                      Great Environmental Awareness
                    </Badge>
                  )}
                  {totalDailyFootprint > 5 && totalDailyFootprint <= 25 && (
                    <Badge color="warning" className="mr-1" href="https://explore.panda.org/climate/how-to-reduce-your-carbon-footprint">
                      Room For Improvement
                    </Badge>
                  )}
                  {totalDailyFootprint > 25 && (
                    <Badge color="danger" className="mr-1" href="https://explore.panda.org/climate/how-to-reduce-your-carbon-footprint">
                      Reduce Usage Now
                    </Badge>
                  )}
                </>
              )}
              <Row className="d-flex justify-content-center align-items-center">
                <Col md="5" className="text-center">
                  <h3>
                    {totalDailyFootprint > 0 && (
                      <p>Daily: {totalDailyFootprint}kg</p>
                    )}
                  </h3>
                </Col>
                <Col md="5" className="text-center">
                  <h3>
                    {totalYearlyFootprint > 0 && (
                      <p>Yearly: {totalYearlyFootprint}kg</p>
                    )}
                  </h3>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
}

export default CarbonCalc;
