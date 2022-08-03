import React, { useState, useContext } from 'react';

// bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// context imports
import SettingsContext from '../context/SettingsContext';

// constants imports
import SETTINGS from '../constant/SETTINGS';

function FormModal({ showModal, handleCloseModal }) {
  // settings
  const { currentSettings, handleSettingsChange } = useContext(SettingsContext);

  const [newSettings, setNewSettings] = useState({
    [SETTINGS.FOCUS]: currentSettings.focus,
    [SETTINGS.SHORT_BREAK]: currentSettings.shortBreak,
    [SETTINGS.LONG_BREAK]: currentSettings.longBreak,
    [SETTINGS.LONG_BREAK_INTERVAL]: currentSettings.longBreakInterval,
  });

  // modal

  // local functions

  const handleChange = (event) => {
    setNewSettings((prevSettings) => {
      return {
        ...prevSettings,
        [event.target.dataset.field]: +event.target.value,
      };
    });
  };

  // component

  return (
    <div>
      <Modal size='md' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleSettingsChange(newSettings);
            }}
          >
            <Row className='mb-3'>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Focus Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Focus Minutes'
                    defaultValue={currentSettings.focus}
                    onChange={handleChange}
                    data-field={SETTINGS.FOCUS}
                  />
                </Form.Group>
              </Col>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Short Break Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Short Break Minutes'
                    defaultValue={currentSettings.shortBreak}
                    onChange={handleChange}
                    data-field={SETTINGS.SHORT_BREAK}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Long Break Time (In Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Long Break Minutes'
                    defaultValue={currentSettings.longBreak}
                    onChange={handleChange}
                    data-field={SETTINGS.LONG_BREAK}
                  />
                </Form.Group>
              </Col>

              <Col xs='auto'>
                <Form.Group>
                  <Form.Label>Long Break Interval</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Intervals before long break'
                    defaultValue={currentSettings.longBreakInterval}
                    onChange={handleChange}
                    data-field={SETTINGS.LONG_BREAK_INTERVAL}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='justify-content-center'>
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
