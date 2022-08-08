import React, { useContext } from 'react';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// context imports
import TimerContext from '../context/TimerContext';

// constants imports
import SETTINGS from '../constant/SETTINGS';
import ACTIONS from '../constant/ACTIONS';

// react-icons
import { FaFastForward } from 'react-icons/fa';

function Timer() {
  // context
  const {
    currentPhase,
    currentInterval,
    time,
    timeRunning,
    convertTime,
    toggleTimer,
    manualPhaseChange,
  } = useContext(TimerContext);

  return (
    <>
      <Container
        className='text-center my-3 pb-5 pt-3 timer-tile shadow-lg'
        style={{
          maxWidth: '550px',
          borderRadius: '10px',
        }}
      >
        {/* focus/break buttons */}
        <Row>
          <Stack
            direction='horizontal'
            gap={5}
            className='justify-content-center align-items-center'
          >
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === SETTINGS.FOCUS && 'active'}
              onClick={() => manualPhaseChange(ACTIONS.CHANGE, SETTINGS.FOCUS)}
            >
              Focus
            </Button>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === SETTINGS.SHORT_BREAK && 'active'}
              onClick={() =>
                manualPhaseChange(ACTIONS.CHANGE, SETTINGS.SHORT_BREAK)
              }
            >
              Short Break
            </Button>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === SETTINGS.LONG_BREAK && 'active'}
              onClick={() =>
                manualPhaseChange(ACTIONS.CHANGE, SETTINGS.LONG_BREAK)
              }
            >
              Long Break
            </Button>
          </Stack>
        </Row>
        {/* timer */}
        <Row>
          <Col>
            <div className='text-light fw-bold' style={{ fontSize: '120px' }}>
              {convertTime(time)}
            </div>
          </Col>
        </Row>
        {/* start and skip buttons */}
        <Row xs='auto' className='align-items-center justify-content-center'>
          <Col>
            <Button
              variant={timeRunning ? 'warning' : 'success'}
              className='py-2 px-5'
              onClick={toggleTimer}
            >
              <span
                className={`fs-1 fw-bold ${
                  timeRunning ? 'text-dark' : 'text-light'
                }`}
              >
                {timeRunning ? 'Pause' : 'Start!'}
              </span>
            </Button>
          </Col>
          {timeRunning && (
            <Col className='justify-self-end'>
              <Button
                variant='outline-light'
                style={{ border: 'none' }}
                onClick={() => manualPhaseChange(ACTIONS.SKIP)}
              >
                <FaFastForward className='fs-1 align-middle' />
              </Button>
            </Col>
          )}
        </Row>
      </Container>
      <Container
        className='text-center shadow-lg timer-tile'
        style={{
          maxWidth: '550px',
          borderRadius: '10px',
        }}
      >
        <Row
          className='justify-content-center align-items-center py-2'
          xs='auto'
        >
          <Col>
            <p className='text-light fs-4 m-0'>
              Pomo Round: #{currentInterval}
            </p>
          </Col>
          <Col>
            <p className='text-light fs-4 m-0'>Current Phase: {currentPhase}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Timer;
