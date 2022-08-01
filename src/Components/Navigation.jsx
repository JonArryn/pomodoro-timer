// react imports
import React from 'react';
import { useContext } from 'react';

// bootstrap component imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// asset imports
import { ReactComponent as GearFill } from '../Assets/gear-fill.svg';

// hooks

// context
import AppContext from '../Context/AppContext';

////// TODO
// create a white bottom border on navbar for some separation
//////

// // // CODE
function Navigation() {
  // // hooks

  // useModal hook from context
  const { handleShowModal } = useContext(AppContext);

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
            <Button variant='outline-light' onClick={handleShowModal}>
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
