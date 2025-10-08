import React, { FC, useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { ApplicationContext, ApplicationData, DEFAULT_APP_VALUES } from './utils';
import { ServiceMatrix, ServiceStatusMessage, StatisticGraph } from './containers/MainGraph';

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
              <ServiceStatusMessage />
              {/* Service matrix */}
              <br />
              <h3>Individual Services</h3>
              <ServiceMatrix />
              {/* Statistical graphs */}
              <br />
              <h3>Statistics</h3>
              <Card className={`border-success-subtle bg-success-subtle`}>
                <CardBody>
                  <StatisticGraph />
                </CardBody>
              </Card>
            </Col>
            {/* Spacer */}
            <Col xl="1" />
          </Row>
        </main>
      </Container>
    </ApplicationContext.Provider>
  );
};
