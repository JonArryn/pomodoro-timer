import React, { useContext } from 'react';

// CONSTANTS imports
import TASK_ACTIONS from '../constant/TASK_ACTIONS';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// context imports
import TaskListContext from '../context/TaskListContext';

function DeletedTaskModal({ showModal, handleCloseModal }) {
  // contexts
  const taskList = useContext(TaskListContext);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Deleted Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {taskList.tasks
            .filter((task) => task.isDeleted)
            .map((task) => (
              <ListGroup.Item key={task.id}>
                <Stack
                  direction='horizontal'
                  className='justify-content-between'
                >
                  <span className={`${task.isComplete && 'task-complete'}`}>
                    {task.text}
                  </span>
                  <Button
                    variant='outline-secondary'
                    size='sm'
                    id={task.id}
                    onClick={(event) =>
                      taskList.UpdateTask(
                        +event.target.id,
                        TASK_ACTIONS.RESTORE
                      )
                    }
                  >
                    Restore
                  </Button>
                </Stack>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletedTaskModal;
