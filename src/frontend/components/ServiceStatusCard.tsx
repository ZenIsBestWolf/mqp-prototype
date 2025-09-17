import React, { FC } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';

export const ServiceStatusCard: FC<{ readonly serviceName: string }> = ({ serviceName }) => {
  return (
    <Card>
      <CardBody>
        <CardText>
          <span>{serviceName}</span>
          <div className="d-inline-block float-end">
            <MaterialIcon className="align-text-top text-success" name="check_circle" />
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};
