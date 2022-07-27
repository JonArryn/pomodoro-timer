// react imports
import React from 'react';

// bootstrap component imports
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// asset imports
import { ReactComponent as GearFill } from '../Assets/gear-fill.svg';

////// TODO
// create a white bottom border on navbar for some separation
//////

// // // CODE
function Navigation() {
  return (
    <nav className='py-2'>
      <Container className='text-center'>
        <Row className='align-items-center justify-content-center'>
          <Col>
            <h2 href='#home'>
              <div className='text-light'>Pomodoro Timer</div>
            </h2>
          </Col>
          <Col>
            <Button variant='outline-light'>
              <div>
                <GearFill />
                <span className='align-middle'> Settings</span>
              </div>
            </Button>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navigation;
