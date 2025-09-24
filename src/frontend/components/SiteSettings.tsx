import { FC, useCallback, useContext, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import React from 'react';
import {
  ApplicationContext,
  ApplicationData,
  DEFAULT_APP_VALUES,
  ServiceStatus,
  statuses,
} from '../utils';

export const SiteSettings: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MaterialIcon name="settings" />
      </Button>
      {open && (
        <SiteSettingsModal
          close={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

const SiteSettingsModal: FC<{ readonly close: () => void }> = ({ close }) => {
  const { application, setApplication } = useContext(ApplicationContext);
  const [appState, setAppState] = useState(application);

  const submit = useCallback(() => {
    setApplication({
      ...appState,
      serviceMessage: appState.serviceMessage === '' ? undefined : appState.serviceMessage,
    });
    close();
  }, [appState, close, setApplication]);

  const updateApplication = useCallback(
    (k: keyof ApplicationData, v: ApplicationData[keyof ApplicationData]) => {
      setAppState((oldApp) => ({
        ...oldApp,
        [k]: v,
      }));
    },
    [setAppState],
  );

  const updateServiceMap = useCallback(
    (service: string, status: ServiceStatus) => {
      setAppState((oldApp) => ({
        ...oldApp,
        serviceMap: {
          ...oldApp.serviceMap,
          [service]: status,
        },
      }));
    },
    [setAppState],
  );

  return (
    <Modal isOpen>
      <ModalHeader>Prototype Settings</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <p>Service Matrix</p>
            <Row className="row-cols-2">
              {Object.keys(appState.serviceMap).map((s) => (
                <Col key={s}>
                  <ServiceInput
                    setStatus={(v) => {
                      updateServiceMap(s, v);
                    }}
                    serviceName={s}
                    currentStatus={appState.serviceMap[s]}
                  />
                </Col>
              ))}
            </Row>
          </FormGroup>
          <FormGroup>
            <ServiceInput
              setStatus={(v) => {
                updateApplication('globalServiceStatus', v);
              }}
              serviceName="Global Service Status"
              currentStatus={appState.globalServiceStatus}
            />
          </FormGroup>
          <FormGroup>
            <Label for="msgOverride">Custom Message Override</Label>
            <Input
              id="msgOverride"
              type="text"
              placeholder="Enter text to override default 'Current Status' message..."
              defaultValue={appState.serviceMessage}
              onChange={(e) => {
                updateApplication('serviceMessage', e.currentTarget.value);
              }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          className="me-auto"
          onClick={() => {
            setApplication(DEFAULT_APP_VALUES);
            close();
          }}
        >
          Reset to Default
        </Button>
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
        <Button color="primary" onClick={submit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ServiceInput: FC<{
  readonly serviceName: string;
  readonly currentStatus: ServiceStatus;
  readonly setStatus: (status: ServiceStatus) => void;
}> = ({ serviceName, currentStatus, setStatus }) => {
  const displayNames: Record<ServiceStatus, string> = {
    up: 'Online',
    partial: 'Degraded',
    down: 'Offline',
  };
  return (
    <>
      <Label for={`${serviceName}-select-input`}>{serviceName}</Label>
      <Input
        onChange={(e) => {
          setStatus(e.currentTarget.value as ServiceStatus);
        }}
        type="select"
        id={`${serviceName}-select-input`}
        defaultValue={currentStatus}
      >
        {statuses.map((s) => (
          <option value={s} key={s}>
            {displayNames[s]}
          </option>
        ))}
      </Input>
    </>
  );
};
