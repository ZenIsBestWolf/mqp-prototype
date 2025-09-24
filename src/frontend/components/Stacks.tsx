import React, { FC, ReactNode } from 'react';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly gap?: 1 | 2 | 3 | 4 | 5;
  readonly className?: string;
}

interface InnerStackProps extends StackProps {
  readonly stackStyle: 'vstack' | 'hstack';
}

const InnerStack: FC<InnerStackProps> = ({
  stackStyle,
  gap,
  children,
  className,
  ...attributes
}) => {
  return (
    <div
      {...attributes}
      className={`${stackStyle}${gap ? ` gap-${gap}` : ``}${className ? ` ${className}` : ``}`}
    >
      {children}
    </div>
  );
};

export const HorizontalStack: FC<StackProps> = (props) => {
  return <InnerStack stackStyle="hstack" {...props} />;
};

export const VerticalStack: FC<StackProps> = (props) => {
  return <InnerStack stackStyle="vstack" {...props} />;
};
