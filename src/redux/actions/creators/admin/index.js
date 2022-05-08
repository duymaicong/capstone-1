import * as AdminActionTypes from "../../types/admin/index";
import { api } from "../../../../api/api";

//GET LIST SALON ACTIVE
export const getListSalonActive = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonActive`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getListSalonActiveFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getListSalonActiveSuccessfully({
            listSalonActive: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonActiveFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon active failed", error);
    });
};

const getListSalonActiveSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_ACTIVE_SUCCESSFULLY,
    payload,
  };
};

const getListSalonActiveFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_ACTIVE_FAILED,
    payload: errMess,
  };
};

export const resetListSalonActive = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_ACTIVE,
  });
};

//GET LIST SALON DEACTIVE
export const getListSalonDeactive = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonDeactive`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getListSalonDeactiveFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getListSalonDeactiveSuccessfully({
            listSalonDeactive: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonDeactiveFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon deactive failed", error);
    });
};

const getListSalonDeactiveSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_DEACTIVE_SUCCESSFULLY,
    payload,
  };
};

const getListSalonDeactiveFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_DEACTIVE_FAILED,
    payload: errMess,
  };
};

export const resetListSalonDeactive = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_DEACTIVE,
  });
};

//GET LIST SALON REQUEST
export const getListSalonRequest = (token, nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/admin/getSalonRequest`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-access-token": `${token}`,
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
          dispatch(getListSalonRequestFail(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.message) {
        dispatch(
          getListSalonRequestSuccessfully({
            listSalonRequest: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getListSalonRequestFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get list salon request failed", error);
    });
};

const getListSalonRequestSuccessfully = (payload) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_REQUEST_SUCCESSFULLY,
    payload,
  };
};

const getListSalonRequestFail = (errMess) => {
  return {
    type: AdminActionTypes.GET_LIST_SALON_REQUEST_FAILED,
    payload: errMess,
  };
};

export const resetListSalonRequest = () => (dispatch) => {
  dispatch({
    type: AdminActionTypes.RESET_LIST_SALON_REQUEST,
  });
};
