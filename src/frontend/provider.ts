import { createContext, useContext } from 'react';
import { ServiceStatus } from '../shared/status';

export interface ApplicationData {
  readonly serviceMap: Record<string, ServiceStatus>;
  readonly globalServiceStatus: ServiceStatus;
  readonly serviceMessage?: string;
}

export const ApplicationContext = createContext<{
  readonly application: ApplicationData;
  readonly setApplication: (value: ApplicationData) => void;
}>({} as never);

export const useApp = () => {
  const { application } = useContext(ApplicationContext);
  return application;
};

export const DEFAULT_APP_VALUES: ApplicationData = {
  serviceMap: {
    'Service A': 'up',
    'Service B': 'up',
    'Service C': 'partial',
    'Service D': 'up',
    'Service E': 'down',
    'Service F': 'up',
  },
  globalServiceStatus: 'partial',
};
