import { act } from "@testing-library/react";
import { Actiontypes } from "./ActionTypes";
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
  SET_CARD,
  CHANGE_CARD,
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
  card: [],
};
const stageReducer = (state = trelloState, action) => {
  const { stages } = state;
  switch (action.type) {
    case CHANGE_STAGE:
      return {
        ...state,
        stages: [...action.payload],
      };
    case SET_STAGE:
      return {
        ...state,
        stages: [...stages, action.payload],
      };
    case SET_CARD:
      return {
        ...state,
        card: [...state.card, action.payload],
      };
    case CHANGE_CARD:
      return {
        ...state,
        card: [...action.payload],
      };
    default:
      return state;
  }
};
export const reducer = combineReducers({
  userStore: userReducer,
  trelloStage: stageReducer,
});
