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

function SettingsModal({ showModal, handleCloseModal }) {
  // settings
  const { currentSettings, handleSettingsChange } = useContext(SettingsContext);
  const [hasErrors, setHasErrors] = useState({
    [SETTINGS.FOCUS]: false,
    [SETTINGS.SHORT_BREAK]: false,
    [SETTINGS.LONG_BREAK]: false,
    [SETTINGS.LONG_BREAK_INTERVAL]: false,
  });

  const [newSettings, setNewSettings] = useState({
    [SETTINGS.FOCUS]: +currentSettings.focus,
    [SETTINGS.SHORT_BREAK]: +currentSettings.shortBreak,
    [SETTINGS.LONG_BREAK]: +currentSettings.longBreak,
    [SETTINGS.LONG_BREAK_INTERVAL]: +currentSettings.longBreakInterval,
  });
  // modal

  // local functions

  const updateErrors = (field, hasError) => {
    if (hasError) {
      setHasErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else {
      setHasErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };

  const validateField = (field, value) => {
    if (field === SETTINGS.FOCUS) {
      if (value < 5 || value > 60 || typeof value !== 'number') {
        updateErrors(field, true);
      } else {
        updateErrors(field, false);
      }
    }
    if (field === SETTINGS.SHORT_BREAK) {
      if (value < 5 || value > 15 || typeof value !== 'number') {
        updateErrors(field, true);
      } else updateErrors(field, false);
    }
    if (field === SETTINGS.LONG_BREAK) {
      if (value < 5 || value > 30 || typeof value !== 'number') {
        updateErrors(field, true);
      } else updateErrors(field, false);
    }
    if (field === SETTINGS.LONG_BREAK_INTERVAL) {
      if (value < 1 || value > 10 || typeof value !== 'number') {
        updateErrors(field, true);
      } else updateErrors(field, false);
    }
  };

  const handleChange = (event) => {
    setNewSettings((prevSettings) => {
      return {
        ...prevSettings,
        [event.target.dataset.field]: +event.target.value,
      };
    });
    validateField(event.target.dataset.field, +event.target.value);
  };

  // component

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
              handleSettingsChange(newSettings);
            }}
          >
            <Row className='mb-1' style={{ borderRadius: '10px' }}>
              <div className='text-center mb-2'>Phase Times in Minutes</div>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='focusMinutes'>Focus Time</Form.Label>
                  <Form.Control
                    id='focusMinutes'
                    type='number'
                    placeholder='Focus'
                    defaultValue={currentSettings.focus}
                    onChange={handleChange}
                    data-field={SETTINGS.FOCUS}
                    min='5'
                    max='60'
                  />

                  <Form.Text
                    id='focusMinutesValid'
                    className={`fs-10 ${
                      hasErrors[SETTINGS.FOCUS] && 'text-danger'
                    }`}
                  >
                    Between 5 and 60 minutes
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Short Break</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Short Break'
                    defaultValue={currentSettings.shortBreak}
                    onChange={handleChange}
                    data-field={SETTINGS.SHORT_BREAK}
                    min='5'
                    max='15'
                  />

                  <Form.Text
                    id='focusMinutesValid'
                    className={`fs-10 ${
                      hasErrors[SETTINGS.SHORT_BREAK] && 'text-danger'
                    }`}
                  >
                    Between 5 and 15 minutes
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Long Break</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Long Break'
                    defaultValue={currentSettings.longBreak}
                    onChange={handleChange}
                    data-field={SETTINGS.LONG_BREAK}
                    min='5'
                    max='30'
                  />

                  <Form.Text
                    id='focusMinutesValid'
                    className={`fs-10 ${
                      hasErrors[SETTINGS.LONG_BREAK] && 'text-danger'
                    }`}
                  >
                    Between 5 and 30 minutes
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <hr></hr>
            <Row
              className='mb-3 py-3 justify-content-center'
              style={{ borderRadius: '10px' }}
            >
              <Col xs={4}>
                <Form.Group>
                  <Form.Label>Long Break Interval</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Intervals before long break'
                    defaultValue={currentSettings.longBreakInterval}
                    onChange={handleChange}
                    data-field={SETTINGS.LONG_BREAK_INTERVAL}
                    min='1'
                    max='10'
                  />

                  <Form.Text
                    id='focusMinutesValid'
                    className={`fs-10 ${
                      hasErrors[SETTINGS.LONG_BREAK_INTERVAL] && 'text-danger'
                    }`}
                  >
                    Between 1 and 10 intervals
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <hr></hr>
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
                  disabled={
                    !Object.values(hasErrors).every((value) => value === false)
                  }
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

export default SettingsModal;
