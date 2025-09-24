import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export const SubscribeButton: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SubscribeModal
        open={open}
        close={() => {
          setOpen(false);
        }}
      />
      <Button
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Subscribe to Updates
      </Button>
    </>
  );
};

const SubscribeModal: FC<{ readonly open: boolean; readonly close: () => void }> = ({
  open,
  close,
}) => {
  return (
    <Modal isOpen={open}>
      <ModalHeader>Subscribe for Updates</ModalHeader>
      <ModalBody>
        Enter your email below to receive updates on status changes.
        <Input type="email" required placeholder="Enter your email here..." />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            close();
            toast.success(`You have been subscribed to updates.`);
          }}
          type="submit"
          color="primary"
        >
          Subscribe
        </Button>
      </ModalFooter>
    </Modal>
  );
};
