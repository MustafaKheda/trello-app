import { Actiontypes } from "./ActionTypes";

export const setUser = (data) => {
  return {
    type: Actiontypes.SET_USER,
    payload: data,
  };
};

export const setCurrentUser = (obj) => {
  return {
    type: Actiontypes.SET_CURRENT_USER,
    payload: obj,
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
  return {
    type: Actiontypes.SET_STAGE,
    payload: {
      obj,
      username,
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
  return {
    type: Actiontypes.EDIT_STAGE,
    payload: obj,
  };
};

export const handleUpdateStage = (obj, username) => {
  return {
    type: Actiontypes.UPDATE_STAGE,
    payload: {
      obj,
      username,
    },
  };
};

export const handleDeleteStage = (obj) => {
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

export const handleSetCard = (obj) => {
  return {
    type: Actiontypes.SET_CARD,
    payload: obj,
  };
};

export const handleDeleteCard = (id) => {
  return {
    type: Actiontypes.DELETE_CARD,
    payload: id,
  };
};

export const handleEditCard = (obj, type) => {
  return {
    type: Actiontypes.EDIT_CARD,
    payload: { obj, type },
  };
};

export const handleUpdateCard = (obj, username) => {
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

export const handleUpdateComment = (obj, type) => {
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

export const handleForgetPasswordAction = (obj) => {
  return {
    type: Actiontypes.FORGET_PASSWORD,
    payload: obj,
  };
};

export const handleEditUser = (id) => {
  return {
    type: Actiontypes.EDIT_USER,
    payload: id,
  };
};
export const handleUnsetEditUser = () => {
  return {
    type: Actiontypes.UNSET_EDIT_USER,
  };
};

export const handleUpdateUserAction = (obj) => {
  return {
    type: Actiontypes.UPDATE_USER,
    payload: obj,
  };
};

export const handleUpdatePasswordAction = (obj) => {
  return {
    type: Actiontypes.UPDATE_PASSWORD,
    payload: obj,
  };
};
