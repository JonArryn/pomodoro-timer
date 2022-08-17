import React, { useContext } from 'react';

import TaskItem from './TaskItem';
import TaskEditor from './TaskEditor';
import DeletedTaskModal from './DeletedTaskModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

import TaskListContext from '../context/TaskListContext';
import { useModal } from '../hook/useModal';

function TaskList() {
  const { tasks, addTask } = useContext(TaskListContext);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  return (
    <>
      <Container className='text-center my-3 pb-5 tile'>
        <Row
          xs='auto'
          className='mb-3 border-bottom border-light align-items-center justify-content-between'
        >
          <Col className='mb-2'>
            <span className='text-light fs-4'>Task List</span>
          </Col>
          <Col className='mb-2'>
            <div type='button' onClick={handleShowModal}>
              <FaTrashAlt className='fs-3 text-light trash' />
            </div>
          </Col>
        </Row>
        <Row className='mx-1 mb-3'>
          <Button
            variant='outline-light'
            className='p-3 tile border border-3 border-light'
            onClick={addTask}
          >
            <AiFillPlusCircle className='fs-2 me-2' />
            <span className='align-middle'>Add Task</span>
          </Button>
        </Row>
        {tasks
          .filter((task) => !task.isDeleted)
          .map((task) => {
            if (task.isEdit) {
              return <TaskEditor task={task} key={task.id} />;
            } else return <TaskItem task={task} key={task.id} />;
          })}
      </Container>
      <DeletedTaskModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default TaskList;
