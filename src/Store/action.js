import { Actiontypes } from "./ActionTypes";

export const setUser = (data) => {
  console.log(data);
  return {
    type: Actiontypes.SET_USER,
    payload: data,
  };
};

export const setCurrentUser = (id, username) => {
  return {
    type: Actiontypes.SET_CURRENT_USER,
    payload: {
      id,
      username,
    },
  };
};

export const unSetCurrentUser = () => {
  return {
    type: Actiontypes.UNSET_CURRENT_USER,
  };
};

export const handleChangeStage = (obj) => {
  return {
    type: Actiontypes.CHANGE_STAGE,
    payload: obj,
  };
};

export const handleSetStage = (obj, username) => {
  console.log(obj, username);
  return {
    type: Actiontypes.SET_STAGE,
    payload: {
      obj,
      username,
    },
  };
};

export const handleSetCard = (obj) => {
  const {
    assignTo,
    assignBy,
    comments,
    createdAt,
    createdBy,
    description,
    dueDate,
    id,
    isDelete,
    modifiedAt,
    modifiedBy,
    stageId,
    title,
    userId,
  } = obj;
  console.log(obj);
  return {
    type: Actiontypes.SET_CARD,
    payload: {
      assignTo,
      assignBy,
      comments,
      createdAt,
      createdBy,
      description,
      dueDate,
      id,
      isDelete,
      modifiedAt,
      modifiedBy,
      stageId,
      title,
      userId,
    },
  };
};
export const handleChangeCard = (obj) => {
  return {
    type: Actiontypes.CHANGE_CARD,
    payload: obj,
  };
};
export const editStage = (obj) => {
  console.log(obj);
  return {
    type: Actiontypes.EDIT_STAGE,
    payload: obj,
  };
};
export const handleUpdateStage = (obj, username) => {
  console.log(obj);
  return {
    type: Actiontypes.UPDATE_STAGE,
    payload: {
      obj,
      username,
    },
  };
};
export const handleDeleteStage = (obj) => {
  console.log(obj);
  return {
    type: Actiontypes.DELETE_STAGE,
    payload: obj,
  };
};
export const unSetEditStage = () => {
  return {
    type: Actiontypes.UNSET_EDIT_STAGE,
  };
};

export const handleDeleteCard = (id) => {
  console.log(id);
  return {
    type: Actiontypes.DELETE_CARD,
    payload: id,
  };
};
export const handleEditCard = (obj) => {
  console.log(obj);
  return {
    type: Actiontypes.EDIT_CARD,
    payload: obj,
  };
};
export const handleUpdateCard = (obj, username) => {
  console.log(obj, username);
  return {
    type: Actiontypes.UPDATE_CARD,
    payload: {
      obj,
      username,
    },
  };
};
export const handleUnsetEditCard = () => {
  return {
    type: Actiontypes.UNSET_EDIT_CARD,
  };
};
export const handleUpdateComment = (obj) => {
  console.log(obj);
  return {
    type: Actiontypes.UPDATE_COMMENT,
    payload: obj,
  };
};

export const deleteCard = (id) => {
  return {
    type: Actiontypes.LIST_DELETE_CARD,
    payload: id,
  };
};
export const deleteStage = (id) => {
  return {
    type: Actiontypes.LIST_DELETE_STAGE,
    payload: id,
  };
};
export const deleteUser = (id) => {
  return {
    type: Actiontypes.LIST_DELETE_USER,
    payload: id,
  };
};

export const deleteComment = (id, cardId) => {
  return {
    type: Actiontypes.DELETE_COMMENT,
    payload: {
      id,
      cardId,
    },
  };
};
