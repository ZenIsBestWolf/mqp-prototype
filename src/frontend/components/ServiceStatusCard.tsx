import React, { FC } from 'react';
import { Card, CardBody } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import { ServiceStatus } from '../utils';

export const ServiceStatusCard: FC<{
  readonly serviceName: string;
  readonly status: ServiceStatus;
}> = ({ serviceName, status }) => {
  let materialIcon = '';
  let textColor = '';

  switch (status) {
    case 'up': {
      materialIcon = 'check_circle';
      textColor = 'success';
      break;
    }
    case 'partial': {
      materialIcon = 'error';
      textColor = 'warning';
      break;
    }
    case 'down': {
      materialIcon = 'cancel';
      textColor = 'danger';
      break;
    }
  }
  return (
    <Card>
      <CardBody>
        <span>{serviceName}</span>
        <div className="d-inline-block float-end">
          <MaterialIcon className={`align-text-top text-${textColor}`} name={materialIcon} />
        </div>
      </CardBody>
    </Card>
  );
};
