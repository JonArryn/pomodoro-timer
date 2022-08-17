import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

import TaskListContext from '../context/TaskListContext';

function DeletedTaskModal({ showModal, handleCloseModal }) {
  const { tasks, restoreTask } = useContext(TaskListContext);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Deleted Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {tasks
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
                    onClick={(event) => restoreTask(+event.target.id)}
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
