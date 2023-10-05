import { Actiontypes } from "./ActionTypes";
import { combineReducers } from "redux";
const initialState = {
  currentUser: {},
  users: [],
  editUserData: null,
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
  LIST_DELETE_CARD,
  LIST_DELETE_STAGE,
  LIST_DELETE_USER,
  DELETE_COMMENT,
  FORGET_PASSWORD,
  EDIT_USER,
  UNSET_EDIT_USER,
  UPDATE_USER,
  UPDATE_PASSWORD,
} = Actiontypes;
const userReducer = (state = initialState, action) => {
  const { users } = state;
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
    case EDIT_USER: {
      const editUser = users.find((user) => user.id === action.payload);

      return { ...state, editUserData: editUser };
    }
    case UNSET_EDIT_USER:
      return {
        ...state,
        editUserData: {},
      };
    case UPDATE_PASSWORD: {
      const updatedUser = users.map((user) =>
        user.id === action.payload.editId
          ? { ...user, password: action.payload.newPassword }
          : user
      );

      return {
        ...state,
        users: [...updatedUser],
        editUserData: {
          ...state.editUserData,
          password: action.payload.newPassword,
        },
      };
    }
    case FORGET_PASSWORD: {
      const passwordChangedUsers = users.map((user) =>
        user?.email.toLowerCase() === action.payload?.email?.toLowerCase()
          ? { ...user, password: action.payload.password }
          : user
      );
      return {
        ...state,
        users: [...passwordChangedUsers],
      };
    }

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
    case UPDATE_USER: {
      const updatedUsers = users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: [...updatedUsers],
        editUserData: action.payload,
        currentUser: {
          ...state.currentUser,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
    }

    case LIST_DELETE_USER: {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    }
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
      return {
        ...state,
        stages: [...stages, obj],
      };
    }
    case EDIT_STAGE:
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
      const deleteStages = stages.map((stage) =>
        stage.id === action.payload
          ? {
              ...stage,
              isDelete: true,
            }
          : stage
      );
      const deleteStageCard = card.map((card) =>
        card.stageId === action.payload
          ? {
              ...card,
              isDelete: true,
            }
          : card
      );
      return {
        ...state,
        card: [...deleteStageCard],
        stages: [...deleteStages],
      };
    }
    case UPDATE_STAGE:
      const { obj, username } = action.payload;
      obj.modifiedBy = username;
      obj.modifiedAt = new Date();
      const updatedStageList = stages.map((stage) =>
        stage.id === obj.id ? obj : stage
      );
      return {
        ...state,
        editStageData: null,
        stages: [...updatedStageList],
      };
    case SET_CARD: {
      const newCard = action.payload;
      newCard.createdAt = new Date();
      newCard.createdBy = newCard.assignBy;
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
      const newCards = [...card];
      newCards[indexValue].isDelete = true;
      return {
        ...state,
        card: [...newCards],
      };
    }
    case EDIT_CARD: {
      const { obj, type } = action.payload;

      return {
        ...state,
        editCardData: { ...obj, type },
      };
    }
    case UPDATE_CARD: {
      const { obj, username } = action.payload;
      obj.modifiedAt = new Date();
      obj.modifiedBy = username;
      const updatedCard = card.map((card) => (card.id === obj.id ? obj : card));
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
      let indexValue = card.findIndex((item) => item.id === action.payload.id);
      const newCards = [...card];
      newCards[indexValue].comments = [
        ...newCards[indexValue].comments,
        action.payload.comment,
      ];

      return {
        ...state,
        editCardData: newCards[indexValue],
        card: [...newCards],
      };
    }
    case LIST_DELETE_CARD: {
      const deleted_Card = card.filter((card) =>
        card.id !== action.payload ? card : null
      );
      return {
        ...state,
        card: deleted_Card,
      };
    }
    case LIST_DELETE_STAGE: {
      const deletedStage = stages.filter((stage) =>
        stage.id !== action.payload ? stage : null
      );
      return {
        ...state,
        stages: deletedStage,
      };
    }
    case DELETE_COMMENT: {
      const { cardId, id } = action.payload;

      const updatedCard = card.map((card) => {
        if (card.id === cardId) {
          const updatedComments = card.comments.map((comment) =>
            comment.id === id ? { ...comment, isDelete: true } : comment
          );
          return { ...card, comments: updatedComments };
        }
        return card;
      });

      return {
        ...state,
        editCardData: updatedCard.find((card) => card.id === cardId),
        card: updatedCard,
      };
    }

    default:
      return state;
  }
};
const rootReducer = combineReducers({
  userStore: userReducer,
  trelloStage: stageReducer,
});
//  const reducer = combineReducers({
//   userStore: userReducer,
//   trelloStage: stageReducer,
// });
export default rootReducer;
