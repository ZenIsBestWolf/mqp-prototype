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
