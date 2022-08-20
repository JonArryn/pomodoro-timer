// react imports
import React from 'react';

// app component imports

import Timer from '../component/Timer';
import TaskList from '../component/TaskList';

// hooks
// none yet

// // // TODO
// // current task(s)
//
// // next
//
// // future
// add volume controls to timer sound
// change alerts to modals
// add about and how to use page
// add reset buttons
// add dark mode
// (BONUS) use localStorage to store state
// // //

// // // CODE

function Home() {
  return (
    <>
      <Timer />
      <TaskList />
    </>
  );
}

export default Home;
