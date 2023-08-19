import { act } from "@testing-library/react";
import { Actiontypes } from "./actionTypes";
import { combineReducers } from "redux";
const initialState = {
  currentUser: {},
  users: [],
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
        users: [...state.users, action.payload],
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
  changeStages: [],
  card: [],
};
const stageReducer = (state = trelloState, action) => {
  const { stages } = state;
  switch (action.type) {
    case CHANGE_STAGE:
      console.log(action.payload);
      return {
        ...state,
        stages: [...action.payload],
      };
    case SET_STAGE:
      console.log(action.payload);
      return {
        ...state,
        stages: [...state.stages, action.payload],
      };
    default:
      return state;
  }
};
export const reducer = combineReducers({
  userStore: userReducer,
  trelloStage: stageReducer,
});
