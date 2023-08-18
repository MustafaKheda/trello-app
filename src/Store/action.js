import { Actiontypes } from "./actionTypes";
export const setUser = (data) => {
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
