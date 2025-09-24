import { FC, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MaterialIcon } from './MaterialIcon';
import React from 'react';

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
      <SiteSettingsModal
        close={() => {
          setOpen(false);
        }}
        open={open}
      />
    </>
  );
};

const SiteSettingsModal: FC<{ readonly open: boolean; readonly close: () => void }> = ({
  open,
  close,
}) => {
  return (
    <Modal isOpen={open}>
      <ModalHeader>Prototype Settings</ModalHeader>
      <ModalBody>Settings would go here.</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={close}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
