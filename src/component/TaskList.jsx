import React, { useContext } from 'react';

// component imports
import TaskItem from './TaskItem';
import TaskEditor from './TaskEditor';
import DeletedTaskModal from './DeletedTaskModal';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

// icon imports
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

// context imports
import TaskListContext from '../context/TaskListContext';

// hook imports
import { useModal } from '../hook/useModal';

function TaskList() {
  // TaskListContext
  const taskList = useContext(TaskListContext);

  // hooks
  const deletedTaskModal = useModal();

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
            <div type='button' onClick={deletedTaskModal.handleShowModal}>
              <FaTrashAlt className='fs-3 text-light trash' />
            </div>
          </Col>
        </Row>
        <Row className='mx-1 mb-3'>
          <Button
            variant='outline-light'
            className='p-3 tile border border-3 border-light'
            onClick={taskList.addTask}
          >
            <AiFillPlusCircle className='fs-2 me-2' />
            <span className='align-middle'>Add Task</span>
          </Button>
        </Row>
        {taskList.tasks
          .filter((task) => !task.isDeleted)
          .map((task) => {
            if (task.isEdit) {
              return <TaskEditor task={task} key={task.id} />;
            } else return <TaskItem task={task} key={task.id} />;
          })}
      </Container>
      <DeletedTaskModal
        showModal={deletedTaskModal.showModal}
        handleCloseModal={deletedTaskModal.handleCloseModal}
      />
    </>
  );
}

export default TaskList;
