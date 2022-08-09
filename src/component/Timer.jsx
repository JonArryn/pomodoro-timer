import React, { useContext, useEffect } from 'react';

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

  useEffect(() => {
    if (currentPhase !== SETTINGS.FOCUS) {
      document.body.classList.add('container-break');
      document.body.classList.remove('container-focus');
    } else if (currentPhase === SETTINGS.FOCUS) {
      document.body.classList.add('container-focus');
      document.body.classList.remove('container-break');
    }
  }, [currentPhase]);

  return (
    <>
      <Container
        className={`text-center my-3 pb-5 pt-3 timer-tile shadow-lg tile ${
          currentPhase === SETTINGS.FOCUS ? 'timer-tile' : 'timer-break'
        }`}
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
          <Col xs={{ span: 5, offset: 2 }}>
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
          <Col className='justify-self-end'>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              onClick={() => manualPhaseChange(ACTIONS.SKIP)}
              className={!timeRunning && 'disabled hidden'}
            >
              <FaFastForward className='fs-1 align-middle' />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container
        className={`text-center shadow-lg timer-tile ${
          currentPhase === SETTINGS.FOCUS ? 'timer-tile' : 'timer-break'
        }`}
        style={{
          maxWidth: '550px',
          borderRadius: '10px',
        }}
      >
        {/* Round and Current Phase Tile */}
        <Row
          className='justify-content-center align-items-center py-2 tile'
          xs='auto'
        >
          <Col>
            <p className='text-light fs-4 m-0'>
              Pomo Round: #{currentInterval}
            </p>
          </Col>
          <Col>
            <p className='text-light fs-4 m-0'>
              Current Phase:{' '}
              {currentPhase
                .split('')
                .map((letter, index) => {
                  if (index === 0) {
                    return letter.toUpperCase();
                  } else if (letter === letter.toUpperCase()) {
                    return ' ' + letter;
                  } else return letter;
                })
                .join('')}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Timer;
