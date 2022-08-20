// react imports
import React, { useContext } from 'react';

// bootstrap component imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// asset imports
import { ReactComponent as GearFill } from '../asset/gear-fill.svg';
import { IoNotificationsOffSharp } from 'react-icons/io5';
import { IoNotificationsSharp } from 'react-icons/io5';

// hooks
import { useModal } from '../hook/useModal';

// app components
import SettingsModal from './SettingsModal';

// context
import NotificationContext from '../context/NotificationContext';
import TimerContext from '../context/TimerContext';

////// TODO
// create a white bottom border on navbar for some separation
//////

// // // CODE
function Navigation() {
  // context
  const notification = useContext(NotificationContext);
  const { checkFocusPhase: timerCheckFocusPhase } = useContext(TimerContext);

  // useModal hook from context
  const settingsModal = useModal();

  return (
    <>
      <nav className='py-2'>
        <Container
          className={`text-center ${
            timerCheckFocusPhase() ? 'container-focus' : 'container-break'
          }`}
        >
          <Row className='align-items-center justify-content-between'>
            <Col xs='auto'>
              <h2 href='#home'>
                <div className='text-light'>Pomodoro Timer</div>
              </h2>
            </Col>
            <Col xs='auto'>
              <Stack direction='horizontal' gap={3}>
                <Button
                  variant='outline-light'
                  onClick={settingsModal.handleShowModal}
                >
                  <div>
                    <GearFill />
                    <span className='align-middle'> Settings</span>
                  </div>
                </Button>
                {notification.permission === 'default' ? (
                  <Button
                    variant='outline-secondary'
                    onClick={notification.givePermission}
                  >
                    <IoNotificationsOffSharp className='fs-5 text-light' />

                    <span className='text-light'> Turn On Notifications</span>
                  </Button>
                ) : (
                  <div>
                    <IoNotificationsSharp
                      className={`fs-5 me-1 ${
                        notification.permission === 'granted'
                          ? 'text-warning'
                          : 'text-secondary'
                      }`}
                    />
                    <span className='text-light'>
                      Notifications{' '}
                      {notification.permission === 'granted' ? 'On' : 'Off'}
                    </span>
                  </div>
                )}
              </Stack>
            </Col>
          </Row>
        </Container>
      </nav>
      <SettingsModal
        showModal={settingsModal.showModal}
        handleCloseModal={settingsModal.handleCloseModal}
      />
    </>
  );
}

export default Navigation;
