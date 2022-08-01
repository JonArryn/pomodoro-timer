import { useState } from 'react';

export const useModal = (initialState = false) => {
  // modal state
  const [showModal, setShowModal] = useState(initialState);

  // modal functions
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return { showModal, handleShowModal, handleCloseModal };
};
