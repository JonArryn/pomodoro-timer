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
// (BONUS) add task manager
//
// // future
// add volume controls to timer sound
// clean up settings modal
// change alerts to modals
// change color scheme with different phases
// prevent start button from shifting when skip button appears
// add about and how to use page
// add reset buttons
// add dark mode
// (BONUS) use localStorage to store state
// (BONUS) change start/pause button to say resume if timer was paused
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
