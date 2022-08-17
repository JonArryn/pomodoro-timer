import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { MdDragIndicator } from 'react-icons/md';
import { FaEdit, FaCheckCircle, FaTrashAlt, FaUndoAlt } from 'react-icons/fa';

import TaskListContext from '../context/TaskListContext';

function TaskItem({ task }) {
  const { editTask, completeTask, undoComplete, deleteTask } =
    useContext(TaskListContext);

  return (
    <Row className='mx-1 mb-2'>
      <Button variant='light' className='task-item p-3 tile' type='button'>
        <Row
          xs='auto'
          className='text-secondary align-items-center justify-content-between'
        >
          <Col xs={1}>
            <MdDragIndicator className='ms-0 me-2 drag-indicator fs-2' />
          </Col>
          <Col
            xs={8}
            className={`align-middle text-dark fs-6 ${
              task.isComplete && 'task-complete'
            }`}
          >
            <span className={`align-middle text-dark fs-6 `}>{task.text}</span>
          </Col>

          <Col xs={3}>
            <Stack
              direction='horizontal'
              gap={3}
              className='align-items-center justify-content-end align-middle p-0 m-0'
            >
              <Button
                id={task.id}
                disabled={task.isComplete}
                className={`fs-5 task-pencil`}
                onClick={(event) => {
                  event.stopPropagation();
                  editTask(+event.target.id);
                }}
              >
                <FaEdit className='p-0 m-0' pointerEvents='none' />
              </Button>
              {task.isComplete ? (
                <Button
                  type='button'
                  id={task.id}
                  className='fs-5 task-check'
                  onClick={(event) => {
                    event.stopPropagation();
                    undoComplete(+event.target.id);
                  }}
                >
                  <FaUndoAlt pointerEvents='none' />
                </Button>
              ) : (
                <Button
                  type='button'
                  id={task.id}
                  className='fs-5 task-check'
                  onClick={(event) => {
                    event.stopPropagation();
                    completeTask(+event.target.id);
                  }}
                >
                  <FaCheckCircle pointerEvents='none' />
                </Button>
              )}

              <Button
                type='button'
                id={task.id}
                className='fs-5 task-trash'
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTask(+event.target.id);
                }}
              >
                <FaTrashAlt pointerEvents='none' />
              </Button>
            </Stack>
          </Col>
        </Row>
      </Button>
    </Row>
  );
}

export default TaskItem;
