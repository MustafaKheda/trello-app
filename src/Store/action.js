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

export const handleSetStage = (obj) => {
  console.log(obj);
  return {
    type: Actiontypes.SET_STAGE,
    payload: obj,
  };
};
