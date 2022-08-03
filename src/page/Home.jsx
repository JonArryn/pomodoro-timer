// react imports
import React from 'react';

// app component imports

import Timer from '../component/Timer';

// hooks
// none yet

// // // TODO
// // current task(s)
//
// // next
//
// increase round count after each break phase
// // future
// provide "jump" option to skip to next phase
// change color scheme with different phases
// setup up pop up notifications
// play sound when timer depletes
// add bottom border to navbar container
// add reset button
// place current round/phase into a container for cleaner look
// change long break in switchPhase to work in multiples of 4
// (BONUS) add task manager
// (BONUS) use localStorage to store state
// (BONUS) change start/pause button to say resume if timer was paused
// // //

// // // CODE

function Home() {
  return (
    <>
      <Timer />
    </>
  );
}

export default Home;
