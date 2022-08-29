// // // // TODO // // // //
// implement dragging

// // // // BUGS
// // cancelling a new task creates a blank one
// don't add blank task to array, instead show the task editor form
// by doing this i need to find a way to create a task model
// by re-working addTask, I potentially lose the object template for tasks
// use classes?
// what about creating a separate function for new tasks

import { useState } from 'react';

export const useTaskList = () => {
  // state
  const [tasks, setTasks] = useState([]);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

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
        if (task.isNew) {
          setShowNewTaskForm(false);
        }
        return { ...task, ...TASK_ACTION };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  // saves task after edits are made, takes in taskText from component local state
  const saveTask = (taskId, taskText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (task.isNew) {
          setShowNewTaskForm(false);
        }
        return { ...task, isEdit: false, text: taskText, isNew: false };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const openTaskForm = () => {
    setShowNewTaskForm(true);
  };

  return {
    tasks,
    showNewTaskForm,
    openTaskForm,
    addTask,
    saveTask,
    updateTask,
  };
};
