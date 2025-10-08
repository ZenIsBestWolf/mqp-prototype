import React, { FC } from 'react';
import { useApp } from '../utils';
import { Card, CardBody, CardTitle } from 'reactstrap';

export const ServiceStatusMessage: FC = () => {
  const { globalServiceStatus: status, serviceMessage: messageOverride } = useApp();

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
