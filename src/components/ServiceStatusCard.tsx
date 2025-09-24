import React, { FC } from 'react';
import { Card, CardBody } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import { ServiceStatus } from '../utils';

export const ServiceStatusCard: FC<{
  readonly serviceName: string;
  readonly status: ServiceStatus;
}> = ({ serviceName, status }) => {
  let materialIcon = '';
  let themeColor = '';

  switch (status) {
    case 'up': {
      materialIcon = 'check_circle';
      themeColor = 'success';
      break;
    }
    case 'partial': {
      materialIcon = 'error';
      themeColor = 'warning';
      break;
    }
    case 'down': {
      materialIcon = 'cancel';
      themeColor = 'danger';
      break;
    }
  }
  return (
    <Card className={`border-${themeColor}-subtle bg-${themeColor}-subtle`}>
      <CardBody>
        <span>{serviceName}</span>
        <div className="d-inline-block float-end">
          <MaterialIcon className={`align-text-top text-${themeColor}`} name={materialIcon} />
        </div>
      </CardBody>
    </Card>
  );
};
