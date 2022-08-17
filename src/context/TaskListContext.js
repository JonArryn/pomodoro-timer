import React, { createContext } from 'react';

import { useTaskList } from '../hook/useTaskList';

const TaskListContext = createContext();

const TaskListProvider = ({ children }) => {
  return (
    <TaskListContext.Provider value={useTaskList()}>
      {children}
    </TaskListContext.Provider>
  );
};

export { TaskListContext as default, TaskListProvider };
