// // // // TODO // // // //
// implement dragging

import { useState } from 'react';

export const useTaskList = () => {
  // state
  const [tasks, setTasks] = useState([]);

  // handlers
  const addTask = () => {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          text: '',
          isEdit: true,
          isComplete: false,
          isDeleted: false,
          isNew: true,
          isActive: false,
          id: tasks.length + 1,
        },
      ];
    });
  };

  // updates task object property, components provide TASK_ACTION from CONSTANTS when invoked to determine which key:value of the task object to update
  const updateTask = (taskId, TASK_ACTION) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...TASK_ACTION };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  // saves task after edits are made, takes in taskText from component local state
  const saveTask = (taskId, taskText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEdit: false, text: taskText, isNew: false };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    saveTask,
    updateTask,
  };
};
