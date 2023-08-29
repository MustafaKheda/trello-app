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
  EDIT_STAGE,
  UPDATE_STAGE,
  DELETE_STAGE,
  UNSET_EDIT_STAGE,
  DELETE_CARD,
  EDIT_CARD,
  UPDATE_CARD,
  UNSET_EDIT_CARD,
  UPDATE_COMMENT,
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
  editStageData: null,
  editCardData: null,
};

const stageReducer = (state = trelloState, action) => {
  const { stages, card } = state;
  switch (action.type) {
    case CHANGE_STAGE:
      return {
        ...state,
        stages: [...action.payload],
      };
    case SET_STAGE: {
      const { obj, username } = action.payload;
      obj.createdBy = username;
      obj.createdAt = new Date();
      console.log(obj);
      return {
        ...state,
        stages: [...stages, obj],
      };
    }
    case EDIT_STAGE:
      console.log(action.payload);
      return {
        ...state,
        editStageData: action.payload,
      };
    case UNSET_EDIT_STAGE:
      return {
        ...state,
        editStageData: null,
      };
    case DELETE_STAGE: {
      let indexValue = stages.findIndex((item) => item.id === action.payload);
      console.log(indexValue);
      const newStages = [...stages];
      newStages[indexValue].isDelete = true;
      console.log(newStages);
      return {
        ...state,
        stages: [...newStages],
      };
    }
    case UPDATE_STAGE:
      const { obj, username } = action.payload;
      obj.modifiedBy = username;
      obj.modifiedAt = new Date();
      const updatedStageList = stages.map((stage) =>
        stage.id === obj.id ? obj : stage
      );
      console.log(updatedStageList);
      return {
        ...state,
        editStageData: null,
        stages: [...updatedStageList],
      };
    case SET_CARD: {
      const newCard = action.payload;
      newCard.createdAt = new Date();
      newCard.createdBy = newCard.assignBy;
      console.log(newCard);
      return {
        ...state,
        card: [...state.card, newCard],
      };
    }
    case CHANGE_CARD:
      return {
        ...state,
        card: [...action.payload],
      };
    case DELETE_CARD: {
      let indexValue = card.findIndex((item) => item.id === action.payload);
      console.log(indexValue);
      const newCards = [...card];
      newCards[indexValue].isDelete = true;
      console.log(newCards);
      return {
        ...state,
        card: [...newCards],
      };
    }
    case EDIT_CARD: {
      console.log(action.payload);
      return {
        ...state,
        editCardData: action.payload,
      };
    }
    case UPDATE_CARD: {
      const { obj, username } = action.payload;
      obj.modifiedAt = new Date();
      obj.modifiedBy = username;
      const updatedCard = card.map((card) => (card.id === obj.id ? obj : card));
      console.log(updatedCard);
      return {
        ...state,
        editCardData: null,
        card: [...updatedCard],
      };
    }
    case UNSET_EDIT_CARD:
      return {
        ...state,
        editCardData: null,
      };
    case UPDATE_COMMENT: {
      console.log(action.payload);
      let indexValue = card.findIndex((item) => item.id === action.payload.id);
      console.log(indexValue);
      const newCards = [...card];
      newCards[indexValue].comments = [
        ...newCards[indexValue].comments,
        action.payload.comment,
      ];
      console.log(newCards);
      return {
        ...state,
        card: [...newCards],
      };
    }
    default:
      return state;
  }
};
export const reducer = combineReducers({
  userStore: userReducer,
  trelloStage: stageReducer,
});
