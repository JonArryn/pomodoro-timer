import React, { useState } from 'react';

// bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FormModal({ showModal, handleCloseModal, handleSubmit, settings }) {
  const { focus, shortBreak, longBreak, longBreakInterval } = settings;

  const [newSettings, setNewSettings] = useState({
    focus: focus,
    shortBreak: shortBreak,
    longBreak: longBreak,
    longBreakInterval: longBreakInterval,
  });

  const handleChange = (event) => {
    setNewSettings((prevSettings) => {
      return {
        ...prevSettings,
        [event.target.dataset.field]: +event.target.value,
      };
    });
  };

  return (
    <div>
      <Modal size='lg' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(newSettings);
            }}
          >
            <Row className='mb-3'>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Focus Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Focus Minutes'
                    defaultValue={focus}
                    onChange={handleChange}
                    data-field='focus'
                  />
                </Form.Group>
              </Col>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Short Break Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Short Break Minutes'
                    defaultValue={shortBreak}
                    onChange={handleChange}
                    data-field='shortBreak'
                  />
                </Form.Group>
              </Col>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Long Break Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Long Break Minutes'
                    defaultValue={longBreak}
                    onChange={handleChange}
                    data-field='longBreak'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Long Break Interval</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Intervals before long break'
                    defaultValue={longBreakInterval}
                    onChange={handleChange}
                    data-field='longBreakInterval'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='justify-content-end'>
              <Col xs='auto'>
                <Button
                  size='lg'
                  variant='secondary'
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Col>
              <Col xs='auto'>
                <Button
                  size='lg'
                  variant='primary'
                  onClick={handleCloseModal}
                  type='submit'
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FormModal;
