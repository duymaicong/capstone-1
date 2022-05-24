import * as CustomerActionTypes from "../../actions/types/customer/index";

export const VoteOfSalonByCustomer= (
    state = {
      voteOfSalon: null,
      errMess: null,
    },
    action
  ) => {
    switch (action.type) {
      case CustomerActionTypes.GET_VOTE_FOR_SALON_FAILED:
        return { ...state, voteOfSalon: null, errMess: action.payload.errMess };
      case CustomerActionTypes.GET_VOTE_FOR_SALON_SUCCESSFULLY:
        return {
          ...state,
          voteOfSalon: action.payload.voteOfSalon,
          errMess: null,
        };
        case CustomerActionTypes.RESET_VOTE_OF_SALON:
      return { ...state, currentSchedule: null, errMess: null };
  
      default:
        return state;
    }
  };
  
  
  export const ReviewOfSalonByCustomer = (
    state = {
      reviewOfSalon: null,
      errMess: null,
    },
    action
  ) => {
    switch (action.type) {
      case CustomerActionTypes.GET_REVIEW_FOR_SALON_FAILED:
        return { ...state, reviewOfSalon: null, errMess: action.payload.errMess };
      case CustomerActionTypes.GET_REVIEW_FOR_SALON_SUCCESSFULLY:
        return {
          ...state,
          reviewOfSalon: action.payload.reviewOfSalon,
          errMess: null,
        };
        case CustomerActionTypes.RESET_REVIEW_OF_SALON:
      return { ...state, currentSchedule: null, errMess: null };
  
      default:
        return state;
    }
  };

  export const AddFeedBack= (
    state = {
      addFeedBack: null,
      errMess: null,
    },
    action
  ) => {
    switch (action.type) {
      case CustomerActionTypes.ADD_FEEDBACK_FAILED:
        return { ...state, addFeedBack: null, errMess: action.payload.errMess };
      case CustomerActionTypes.ADD_FEEDBACK_SUCCESSFULLY:
        return {
          ...state,
          addFeedBack: action.payload.addFeedBack,
          errMess: null,
        };
  
      default:
        return state;
    }
  };
  