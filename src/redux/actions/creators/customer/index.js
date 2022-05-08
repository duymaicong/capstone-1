import * as CustomerActionTypes from "../../types/customer";
import { api } from "../../../../api/api";
//get vote for salon
export const getVoteOfSalon = (salonId) => (dispatch) => {
    const data = new URLSearchParams({ ...salonId });
    return fetch(`${api}api/customer/get/voteOfSalon`, {
      method: "POST",
      body:data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
       
      },
    })
      .then(
        async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            const errMess = (await response.json()).message;
            dispatch(getVoteOfSalonFailed(errMess));
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error);
          throw errMess;
        }
      )
      .then((response) => {
        if (response.data?.length) {
          dispatch(
            getVoteOfSalonSuccesfully({
              voteOfSalon: response.data,
            })
          );
        } else {
          dispatch(getVoteOfSalonFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Get Vote failed", error);
      });
  };
  
  const getVoteOfSalonSuccesfully = (payload) => {
    return {
      type: CustomerActionTypes.GET_VOTE_FOR_SALON_SUCCESSFULLY,
      payload,
    };
  };
  const getVoteOfSalonFailed = (errMess) => {
    return {
      type: CustomerActionTypes.GET_VOTE_FOR_SALON_FAILED,
      payload: errMess,
    };
  };
  
  //get reviews for salon
  export const getReviewOfSalon = (infor) => (dispatch) => {
    const data = new URLSearchParams({ ...infor });
    return fetch(`${api}api/customer/get/feedbackByStar`, {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        
      },
    })
      .then(
        async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            const errMess = (await response.json()).message;
            dispatch(getReviewOfSalonFailed(errMess));
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error);
          throw errMess;
        }
      )
      .then((response) => {
        if (response.data?.length) {
          dispatch(
            getReviewOfSalonSuccesfully({
              reviewOfSalon: response.data,
            })
          );
        } else {
          dispatch(getReviewOfSalonFailed(response.message));
        }
      })
      .catch((error) => {
        console.log("Get Review failed", error);
      });
  };
  
  const getReviewOfSalonSuccesfully = (payload) => {
    return {
      type: CustomerActionTypes.GET_REVIEW_FOR_SALON_SUCCESSFULLY,
      payload,
    };
  };
  const getReviewOfSalonFailed = (errMess) => {
    return {
      type: CustomerActionTypes.GET_REVIEW_FOR_SALON_FAILED,
      payload: errMess,
    };
  };
  