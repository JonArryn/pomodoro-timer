import React, { useContext } from 'react';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// context imports
import AppContext from '../Context/AppContext';

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
  } = useContext(AppContext);

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
        </Row>
      </Container>
      <Container className='text-center'>
        <Row className='justify-content-center align-items-center'>
          <Col xs='auto'>
            <p className='text-light fs-4'>Pomo Round: #{currentInterval}</p>
          </Col>
          <Col xs='auto'>
            <p className='text-light fs-4'>Current Phase: {currentPhase}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Timer;
