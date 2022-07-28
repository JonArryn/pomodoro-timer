// react imports
import React from 'react';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../Context/AppContext';

////// TODO
// // current task(s)
// create settings modal
// enable settings to change defaults
// modify timer in real time with settings changes
// // next
// increase round count after each break phase
// provide "jump" option to skip to next phase
// change color scheme with different phases
// setup up pop up notifications
// play sound when timer depletes
// add bottom border to navbar container
// add reset button
// place current round/phase into a container for cleaner look
// change long break in switchPhase to work in multiples of 4
// (BONUS) add task manager
// (BONUS) use localStorage to store state
//////

// // // CODE

function Home() {
  // // context
  const { settings, showModal, handleCloseModal } = useContext(AppContext);

  // // state
  const [currentPhase, setCurrentPhase] = useState('focus');

  const [time, setTime] = useState(5000);

  const [timeRunning, setTimeRunning] = useState(false);

  const [currentInterval, setCurrentInterval] = useState(1);

  // // refs

  const timer = useRef();

  // // local functions

  const convertTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);

    const newSeconds = seconds % 60;
    const newMinutes = minutes % 60;

    return `${newMinutes.toString()}:${newSeconds.toString().padStart(2, '0')}`;
  };

  // timer start interval

  const startTimer = () => {
    setTimeRunning((prevTimeRunning) => !prevTimeRunning);

    if (!timeRunning) {
      timer.current = setInterval(() => {
        setTime((prevTime) => {
          return prevTime - 1000;
        });
      }, 1000);
    }

    if (timeRunning) {
      clearInterval(timer.current);
    }
  };

  // phase change logic

  const switchPhase = useCallback(
    (phase) => {
      clearInterval(timer.current);
      setTimeRunning(false);
      if (phase) {
        setCurrentPhase(phase);
        setTime(settings[`${phase}`] * 60 * 1000);
        return;
      } else {
        switch (true) {
          case currentPhase === 'focus' &&
            currentInterval < settings.longBreakInterval:
            setCurrentPhase('shortBreak');
            setTime(settings.shortBreak * 60 * 1000);
            break;
          case currentPhase === 'break' || currentPhase === 'longBreak':
            setCurrentPhase('focus');
            setCurrentInterval((prevRound) => {
              return prevRound + 1;
            });
            setTime(settings.pomodoro * 60 * 1000);
            break;
          case currentPhase === 'focus' &&
            currentInterval === settings.longBreakInterval:
            setCurrentPhase('longBreak');
            setTime(settings.longBreak * 60 * 1000);
            break;
          default:
            setCurrentPhase('focus');
        }
      }
    },
    [currentPhase, currentInterval, settings]
  );

  // warn on manual phase change
  const manualPhaseChange = (phase) => {
    if (timeRunning) {
      if (
        window.confirm(
          'The timer for this phase is still running, are you sure you want to switch?'
        )
      ) {
        switchPhase(phase);
      } else {
        return;
      }
    } else {
      switchPhase(phase);
      return;
    }
  };

  // // useEffects

  // stop timer at 0 and switch phase
  useEffect(() => {
    if (time <= 0) {
      switchPhase();
    }
  }, [time, switchPhase, settings]);

  // stop timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  // component
  return (
    <>
      <Container
        className='text-center my-3 pb-5 pt-3 timer-tile'
        style={{
          maxWidth: '550px',
          borderRadius: '10px',
        }}
      >
        {/* focus/break buttons */}
        <Row>
          <Col>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === 'focus' && 'active'}
              onClick={() => manualPhaseChange('focus')}
            >
              Focus
            </Button>
          </Col>
          <Col>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === 'shortBreak' && 'active'}
              onClick={() => manualPhaseChange('shortBreak')}
            >
              Short Break
            </Button>
          </Col>
          <Col>
            <Button
              variant='outline-light'
              style={{ border: 'none' }}
              className={currentPhase === 'longBreak' && 'active'}
              onClick={() => manualPhaseChange('longBreak')}
            >
              Long Break
            </Button>
          </Col>
        </Row>
        {/* timer */}
        <Row>
          <Col>
            <div className='text-light fw-bold' style={{ fontSize: '120px' }}>
              {convertTime(time)}
            </div>
          </Col>
        </Row>
        {/* start button */}
        <Row>
          <Col>
            <Button
              variant={timeRunning ? 'warning' : 'success'}
              className='py-2 px-5'
              onClick={startTimer}
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
        </Row>
      </Container>
      {/* Phase and Rounds */}
      <Container className='text-center'>
        <Row>
          <Col>
            <p className='text-light fs-3'>Pomo Round: #{currentInterval}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className='text-light fs-4'>Current Phase: {currentPhase}</p>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Home;
