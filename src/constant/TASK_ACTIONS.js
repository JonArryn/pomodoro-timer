const TASK_ACTIONS = {
  MAKE_ACTIVE: { isActive: true },
  MAKE_INACTIVE: { isActive: false },
  EDIT: { isEdit: true },
  CANCEL: { isEdit: false },
  COMPLETE: { isComplete: true },
  UNDO: { isComplete: false },
  DELETE: { isDeleted: true },
  RESTORE: { isDeleted: false },
};

export { TASK_ACTIONS as default };
