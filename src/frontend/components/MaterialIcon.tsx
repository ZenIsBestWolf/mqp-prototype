import React, { FC } from 'react';

export const MaterialIcon: FC<{ readonly name: string; readonly className?: string }> = ({
  name,
  className,
}) => {
  const materialClassName = className ? `${className} material-icons` : `material-icons`;
  return <span className={materialClassName}>{name}</span>;
};
