// react imports
import React from 'react';
import { useContext } from 'react';

// context import
import AppContext from '../Context/AppContext';

// app component imports
import FormModal from '../Components/FormModal';
import Timer from '../Components/Timer';

// hooks
// none yet

// // // TODO
//
// // current task(s)
//
// update times in timer when settings are changed
// modify timer in real time with settings changes
///
// // next
//
// increase round count after each break phase
///
// // future
//
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
  const {
    // useSettings
    settings,
    handleSettingsChange,
    // useModal
    showModal,
    handleCloseModal,
  } = useContext(AppContext);
  return (
    <>
      <Timer />
      <FormModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        settings={settings}
        handleSubmit={handleSettingsChange}
      />
    </>
  );
}

export default Home;
