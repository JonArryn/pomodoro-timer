import React from 'react';

import TaskItem from './TaskItem';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

import { AiFillPlusCircle } from 'react-icons/ai';

function TaskList() {
  return (
    <Container className='text-center my-3 pb-5 tile'>
      <Row xs='auto' className='mb-3 border-bottom border-light'>
        <p className='text-light fs-4'>Task List</p>
      </Row>
      <TaskItem />

      <Row className='mx-1'>
        <Button
          variant='outline-light'
          className='p-3 tile border border-3 border-light'
        >
          <AiFillPlusCircle className='fs-2 me-2' />
          <span className='align-middle'>Add Task</span>
        </Button>
      </Row>
    </Container>
  );
}

export default TaskList;
