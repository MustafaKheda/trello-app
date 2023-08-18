import { act } from "@testing-library/react";
import { Actiontypes } from "./actionTypes";
import { combineReducers } from "redux";
const initialState = {
  currentUser: {},
  user: [],
};

const {
  SET_USER,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_STAGE,
  CHANGE_STAGE,
} = Actiontypes;
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
        },
        user: [...state.user, action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

const trelloState = {
  stages: [],
  changeStage: [],
};
const stageReducer = (state = trelloState, action) => {
  switch (action.type) {
    case CHANGE_STAGE:
      console.log(action.payload);
      return {
        ...state,
        stages: [...action.payload],
      };
    default:
      return state;
  }
};
export const reducer = combineReducers({
  users: userReducer,
  trelloStage: stageReducer,
});
