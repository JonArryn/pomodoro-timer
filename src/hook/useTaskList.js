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

  // not wired up yet, not used yet
  const makeActive = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isActive: true };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEdit: true };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const cancelEdit = (taskId) => {
    const updatedTasks = tasks
      .filter((task) => task.id !== taskId || !task.isNew)
      .map((task) => {
        if (task.id === taskId) {
          return { ...task, isEdit: false };
        } else return task;
      });
    setTasks(updatedTasks);
  };

  const saveEdit = (taskId, taskText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEdit: false, text: taskText, isNew: false };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete: true };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDeleted: true };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const restoreTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDeleted: false };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  const undoComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete: false };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    editTask,
    cancelEdit,
    saveEdit,
    completeTask,
    deleteTask,
    makeActive,
    restoreTask,
    undoComplete,
  };
};
