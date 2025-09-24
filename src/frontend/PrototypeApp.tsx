import React, { FC } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { ServiceStatusCard } from './components/ServiceStatusCard';
import { ServiceStatus } from '../shared/status';

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
            <ServiceStatusMessage status="up" />
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

const ServiceStatusMessage: FC<{ readonly status: ServiceStatus }> = ({ status }) => {
  switch (status) {
    case 'up': {
      return <AllServicesOK />;
    }
    case 'partial': {
      return <SomeServicesDown />;
    }
    case 'down': {
      return <MajorOutage />;
    }
  }
};

const AllServicesOK: FC = () => {
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

const SomeServicesDown: FC = () => {
  return (
    <Card className="text-bg-warning">
      <CardBody className="align-middle">
        <CardTitle tag="h5" className="m-0">
          Some services are experiencing degraded performance.
        </CardTitle>
      </CardBody>
    </Card>
  );
};

const MajorOutage: FC = () => {
  return (
    <Card className="text-bg-danger">
      <CardBody className="align-middle">
        <CardTitle tag="h5" className="m-0">
          Most or all services are experiencing a major outage.
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
            <ServiceStatusCard
              status={idx % 3 === 0 ? 'down' : idx % 3 === 1 ? 'partial' : 'up'}
              serviceName={s}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
