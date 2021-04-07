import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Rules = () => {
  const [lgShow, setLgShow] = useState(false);

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
        <Modal.Body>Вам дана картинка и 4 слова на английском языке. Нужно выбрать слово которое больше всего соответствует для данной картинки</Modal.Body>
      </Modal>
    </>
  );
}

export default Rules
