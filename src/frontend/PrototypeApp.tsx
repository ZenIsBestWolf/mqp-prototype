import React, { FC, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { ServiceStatusCard } from './components/ServiceStatusCard';
import { ApplicationContext, ApplicationData, DEFAULT_APP_VALUES, ServiceStatus } from './utils';

export const App: FC = () => {
  const [application, setApplication] = useState<ApplicationData>(DEFAULT_APP_VALUES);

  useEffect(() => {
    const settings = localStorage.getItem('prototypeSettings');
    if (settings) {
      setApplication(JSON.parse(settings) as ApplicationData);
    }
  }, [setApplication]);

  useEffect(() => {
    localStorage.setItem('prototypeSettings', JSON.stringify(application));
  }, [application]);

  return (
    <ApplicationContext.Provider value={{ application, setApplication }}>
      <Container>
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <NavBar />
        <main>
          <Row>
            {/* Spacer */}
            <Col xl="1" lg="1" />
            <Col xl="10" md="12">
              {/* General Status Indicator */}
              <h3>Current Status</h3>
              <ServiceStatusMessage
                status={application.globalServiceStatus}
                messageOverride={application.serviceMessage}
              />
              {/* Service matrix */}
              <br />
              <h3>Individual Services</h3>
              <ServiceMatrix serviceMap={application.serviceMap} />
              {/* Statistical graphs */}
              <br />
              <h3>Statistics</h3>
            </Col>
            {/* Spacer */}
            <Col xl="1" />
          </Row>
        </main>
      </Container>
    </ApplicationContext.Provider>
  );
};

const ServiceStatusMessage: FC<{
  readonly status: ServiceStatus;
  readonly messageOverride?: string;
}> = ({ status, messageOverride }) => {
  let color: string;
  let message: string;
  switch (status) {
    case 'up': {
      color = 'success';
      message = 'All services are operational.';
      break;
    }
    case 'partial': {
      color = 'warning';
      message = 'Some services are experiencing degraded performance.';
      break;
    }
    case 'down': {
      color = 'danger';
      message = 'Most or all services are experiencing a major outage.';
      break;
    }
  }

  message = messageOverride ?? message;

  return (
    <Card className={`text-bg-${color}`}>
      <CardBody className="align-middle">
        <CardTitle tag="h5" className="m-0 text-white">
          {message}
        </CardTitle>
      </CardBody>
    </Card>
  );
};

const ServiceMatrix: FC<{ readonly serviceMap: Record<string, ServiceStatus> }> = ({
  serviceMap,
}) => {
  const serviceList = Object.keys(serviceMap);

  return (
    <Container>
      <Row className="row-cols-2">
        {serviceList.map((s, idx) => (
          <Col className="p-1" key={idx}>
            <ServiceStatusCard serviceName={s} status={serviceMap[s]} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
