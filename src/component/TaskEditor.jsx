import React, { useState, useContext } from 'react';

// CONSTANTS import
import TASK_ACTIONS from '../constant/TASK_ACTIONS';

// bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

// context imports
import TaskListContext from '../context/TaskListContext';

// // // // BUGS
// // pressing enter on a task refreshes page
// maybe handle onSubmit rather than click?

function TaskEditor({ task }) {
  // contexts
  const taskList = useContext(TaskListContext);

  // local state
  const [taskText, setTaskText] = useState(task.text);

  // update local state
  const onChange = (event) => {
    setTaskText(() => event.target.value);
  };

  return (
    <Row className='mx-1 mb-2'>
      <div className='bg-light p-3 tile'>
        <Row
          xs='auto'
          className='text-secondary align-items-center justify-content-between'
        >
          <Col xs={9} className='text-start'>
            <Form>
              <Form.Group>
                <Form.Label>What's On Your List?</Form.Label>
                <Form.Control
                  type='text'
                  rows={1}
                  placeholder='Enter Task Info...'
                  value={taskText}
                  onChange={(event) => onChange(event)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={3}>
            <Stack gap={2}>
              <Button
                variant='primary'
                size='sm'
                onClick={() => taskList.saveTask(task.id, taskText)}
                disabled={!taskText}
              >
                Save
              </Button>
              <Button
                variant='secondary'
                size='sm'
                onClick={() =>
                  taskList.updateTask(task.id, TASK_ACTIONS.CANCEL)
                }
              >
                Cancel
              </Button>
            </Stack>
          </Col>
        </Row>
      </div>
    </Row>
  );
}

export default TaskEditor;
