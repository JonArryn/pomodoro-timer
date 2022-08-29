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
import ACTIONS from '../constant/TIMER_ACTIONS';

// react-icons
import { FaFastForward } from 'react-icons/fa';

function Timer() {
  // context
  const timer = useContext(TimerContext);

  useEffect(() => {
    if (!timer.checkFocusPhase()) {
      document.body.classList.add('container-break');
      document.body.classList.remove('container-focus');
    } else if (timer.checkFocusPhase()) {
      document.body.classList.add('container-focus');
      document.body.classList.remove('container-break');
    }
  }, [timer]);

  return (
    <>
      <Container
        className={`text-center my-3 pb-5 pt-3 timer-tile shadow-lg tile ${
          timer.checkFocusPhase() ? 'timer-tile' : 'timer-break'
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
              className={timer.checkFocusPhase() && 'active'}
              onClick={() =>
                timer.manualPhaseChange(ACTIONS.CHANGE, SETTINGS.FOCUS)
              }
            >
              Focus
            </Button>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={timer.checkShortBreakPhase() && 'active'}
              onClick={() =>
                timer.manualPhaseChange(ACTIONS.CHANGE, SETTINGS.SHORT_BREAK)
              }
            >
              Short Break
            </Button>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={timer.checkLongBreakPhase() && 'active'}
              onClick={() =>
                timer.manualPhaseChange(ACTIONS.CHANGE, SETTINGS.LONG_BREAK)
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
              {timer.convertTime(timer.time)}
            </div>
          </Col>
        </Row>
        {/* start and skip buttons */}
        <Row xs='auto' className='align-items-center justify-content-center'>
          <Col xs={{ span: 5, offset: 2 }}>
            <Button
              variant={timer.timeRunning ? 'warning' : 'success'}
              className='py-2 px-5'
              onClick={timer.toggleTimer}
            >
              <span
                className={`fs-1 fw-bold ${
                  timer.timeRunning ? 'text-dark' : 'text-light'
                }`}
              >
                {timer.timeRunning ? 'Pause' : 'Start!'}
              </span>
            </Button>
          </Col>
          <Col className='justify-self-end'>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              onClick={() => timer.manualPhaseChange(ACTIONS.SKIP)}
              className={!timer.timeRunning && 'disabled hidden'}
            >
              <FaFastForward className='fs-1 align-middle' />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container
        className={`text-center mb-5 shadow-lg timer-tile ${
          timer.checkFocusPhase() ? 'timer-tile' : 'timer-break'
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
              Pomo Round: #{timer.currentInterval}
            </p>
          </Col>
          <Col>
            <p className='text-light fs-4 m-0'>
              Current Phase:{' '}
              {timer.currentPhase
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
