import React from 'react';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { MdDragIndicator } from 'react-icons/md';

import { FaEdit, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

function TaskItem() {
  return (
    <>
      {/* Standard Task Item */}
      <Row className='mx-1 mb-2'>
        <Button variant='light' className='task-item p-3 tile'>
          <Row
            xs='auto'
            className='text-secondary align-items-center justify-content-between'
          >
            <Col xs={1}>
              <MdDragIndicator className='ms-0 me-2 drag-indicator fs-2' />
            </Col>
            <Col xs={8}>
              <span className='align-middle text-dark fs-6'>
                This is my first task, get it done!This is my first task, get it
                done!
              </span>
            </Col>

            <Col xs={3}>
              <Stack
                direction='horizontal'
                gap={3}
                className='justify-content-end'
              >
                <FaEdit className='fs-5 task-pencil' />
                <FaCheckCircle className='fs-5 task-check' />
                <FaTrashAlt className='fs-5 task-trash' />
              </Stack>
            </Col>
          </Row>
        </Button>
      </Row>

      {/* Task Item Edit Mode */}
      <Row className='mx-1 mb-2'>
        <div className='bg-light p-3 tile'>
          <Row
            xs='auto'
            className='text-secondary align-items-center justify-content-between'
          >
            <Col xs={10} className='text-start'>
              <Form>
                <Form.Group>
                  <Form.Label>What's Next On Your List?</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={1}
                    placeholder='Enter Task Info...'
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col xs={2}>
              <Stack gap={2}>
                <Button variant='primary' size='sm'>
                  Save
                </Button>
                <Button variant='secondary' size='sm'>
                  Cancel
                </Button>
              </Stack>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
}

export default TaskItem;
