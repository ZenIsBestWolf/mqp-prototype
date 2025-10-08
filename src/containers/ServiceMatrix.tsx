import React, { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { ServiceStatusCard } from '../components/ServiceStatusCard';
import { useApp } from '../utils';

export const ServiceMatrix: FC = () => {
  const { serviceMap } = useApp();
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
