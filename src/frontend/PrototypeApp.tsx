import React, { FC } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { ServiceStatusCard } from './components/ServiceStatusCard';

export const App: FC = () => {
  return (
    <Container>
      <a href="#main" className="sr-only">
        Skip to main content
      </a>
      <NavBar />
      <main>
        <Row className="pt-5">
          {/* Spacer */}
          <Col xl="1" lg="1" />
          <Col xl="10" md="12">
            {/* General Status Indicator */}
            <h3>Current Status</h3>
            <GeneralServiceStatus />
            {/* Service matrix */}
            <br />
            <h3>Individual Services</h3>
            <ServiceMatrix />
            {/* Statistical graphs */}
            <br />
            <h3>Statistics</h3>
          </Col>
          {/* Spacer */}
          <Col xl="1" />
        </Row>
      </main>
    </Container>
  );
};

const GeneralServiceStatus: FC = () => {
  return (
    <Card className="text-bg-success">
      <CardBody className="align-middle">
        <CardTitle tag="h5" className="m-0">
          All services are operational.
        </CardTitle>
      </CardBody>
    </Card>
  );
};

const ServiceMatrix: FC = () => {
  const serviceList = [
    'Service A',
    'Service B',
    'Service C',
    'Service D',
    'Service E',
    'Service F',
  ] as const;
  return (
    <Container>
      <Row className="row-cols-2">
        {serviceList.map((s, idx) => (
          <Col className="p-1" key={idx}>
            <ServiceStatusCard serviceName={s} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
