import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Rules = (props: any) => {
  const [lgShow, setLgShow] = useState(false);

  const {rules} = props

  return (
    <>
      <Button size="lg" onClick={() => setLgShow(true)}>Правила игры</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Правила игры:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{rules}</Modal.Body>
      </Modal>
    </>
  );
}

export default Rules
