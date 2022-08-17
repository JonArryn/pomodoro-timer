import React, { useState, useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import TaskListContext from '../context/TaskListContext';

function TaskEditor({ task }) {
  const { cancelEdit, saveEdit } = useContext(TaskListContext);
  const [taskText, setTaskText] = useState(task.text);

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
                  as='textarea'
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
                onClick={() => saveEdit(task.id, taskText)}
              >
                Save
              </Button>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => cancelEdit(task.id)}
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
