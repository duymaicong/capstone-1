import * as BookingActionTypes from "../../types/booking";
import { api } from "../../../../api/api";

export const resetSalonList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_SALON_LIST });
};

export const updateSelectedSalonId = (salonId) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_SALON_ID,
    payload: salonId,
  });
};

export const getSalonList = (nameSalon) => (dispatch) => {
  const data = new URLSearchParams({ ...nameSalon });
  return fetch(`${api}api/customer/searchsalon`, {
    method: "POST",
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getSalonListFailed(errMess));
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
        dispatch(getSalonListSuccessfully(response.data));
      } else {
        dispatch(getSalonListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get salon list error: ", error);
    });
};

const getSalonListSuccessfully = (salonList) => {
  return {
    type: BookingActionTypes.GET_SALON_LIST_SUCCESSFULLY,
    payload: salonList,
  };
};

const getSalonListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_SALON_LIST_FAILED,
    payload: errMess,
  };
};

export const resetServiceList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_SERVICE_LIST });
};

export const updateSelectedService = (service) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_SERVICE,
    payload: service,
  });
};

export const getServiceList = (salonId) => (dispatch) => {
  return fetch(`${api}api/customer/get/serviceOfSalon/${salonId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getServiceListFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data?.length && response.dataSalon?.length) {
        dispatch(getServiceListSuccessfully(response));
      } else {
        dispatch(getServiceListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get service list error: ", error);
    });
};

const getServiceListSuccessfully = (serviceList) => {
  return {
    type: BookingActionTypes.GET_SERVICE_LIST_SUCCESSFULLY,
    payload: serviceList,
  };
};

const getServiceListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_SERVICE_LIST_FAILED,
    payload: errMess,
  };
};

export const resetStaffList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_STAFF_LIST });
};

export const updateSelectedStaffId = (staffId) => (dispatch) => {
  dispatch({
    type: BookingActionTypes.UPDATE_SELECTED_STAFF_ID,
    payload: staffId,
  });
};

export const getStaffList = (serviceId) => (dispatch) => {
  return fetch(`${api}api/customer/get/staff/${serviceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getStaffListFailed(errMess));
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
        dispatch(getStaffListSuccessfully(response.data));
      } else {
        dispatch(getStaffListFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get staff list error: ", error);
    });
};

const getStaffListSuccessfully = (staffList) => {
  return {
    type: BookingActionTypes.GET_STAFF_LIST_SUCCESSFULLY,
    payload: staffList,
  };
};

const getStaffListFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_STAFF_LIST_FAILED,
    payload: errMess,
  };
};

export const getStaffCalendar = (staffInfo) => (dispatch) => {
  const data = new URLSearchParams({ ...staffInfo });
  return fetch(`${api}api/customer/staffCanledar`, {
    method: "POST",
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getStaffCalendarFail(errMess));
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
          getStaffCalendarSuccessfully({
            calendar: response.data,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(getStaffCalendarFail(response.message));
      }
    })
    .catch((error) => {
      console.log("Get staff calendar free failed", error);
    });
};

const getStaffCalendarSuccessfully = (payload) => {
  return {
    type: BookingActionTypes.GET_STAFF_CALENDAR_SUCCESSFULLY,
    payload,
  };
};
const getStaffCalendarFail = (errMess) => {
  return {
    type: BookingActionTypes.GET_STAFF_CALENDAR_FAILED,
    payload: errMess,
  };
};

export const resetStaffCalender = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_STAFF_CALENDAR });
};

export const getHistoryBooking = (token) => (dispatch) => {
  return fetch(`${api}api/customer/get/historyBooking`, {
    method: "GET",
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getHistoryBookingFailed(errMess));
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
        dispatch(getHistoryBookingSuccessfully(response.data));
      } else {
        dispatch(getHistoryBookingFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get history booking error: ", error);
    });
};

const getHistoryBookingSuccessfully = (historyList) => {
  return {
    type: BookingActionTypes.GET_HISTORY_BOOKING_SUCCESSFULLY,
    payload: historyList,
  };
};

const getHistoryBookingFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_HISTORY_BOOKING_FAILED,
    payload: errMess,
  };
};

export const getReservation = (token) => (dispatch) => {
  return fetch(`${api}api/customer/get/reservation`, {
    method: "GET",
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(getReservationFailed(errMess));
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
        dispatch(getReservationSuccessfully(response.data));
      } else {
        dispatch(getReservationFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get reservation list error: ", error);
    });
};

const getReservationSuccessfully = (historyList) => {
  return {
    type: BookingActionTypes.GET_RESERVATION_SUCCESSFULLY,
    payload: historyList,
  };
};

const getReservationFailed = (errMess) => {
  return {
    type: BookingActionTypes.GET_RESERVATION_FAILED,
    payload: errMess,
  };
};

export const cancelReservation = (serviceDetails, token, successCallback) => (dispatch) => {
  const data = new URLSearchParams(serviceDetails);
  return fetch(`${api}api/customer/cancel/registerservice`, {
    method: "PUT",
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(cancelReservationFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.data) {
        successCallback();
      } else {
        dispatch(cancelReservationFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Get reservation list error: ", error);
    });
};

const cancelReservationFailed = (errMess) => {
  return {
    type: BookingActionTypes.CANCEL_RESERVATION_FAILED,
    payload: errMess,
  };
};

export const resetReservationList = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_RESERVATION_LIST });
};

export const bookService = (bookingInfo, token, callback) => (dispatch) => {
  const data = new URLSearchParams({ ...bookingInfo });
  return fetch(`${api}api/customer/create/registerService`, {
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
          var error = new Error("Error " + response.status + ": " + response.statusText);
          const errMess = (await response.json()).message;
          dispatch(bookServiceFailed(errMess));
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
          bookServiceSuccessfully({
            bookingDetails: response.data[0],
            successMessage: response.message,
          })
        );
        if (callback) {
          callback();
        }
      } else {
        dispatch(bookServiceFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Book service failed: ", error);
    });
};

const bookServiceSuccessfully = (payload) => {
  return {
    type: BookingActionTypes.BOOK_SERVICE_SUCCESSFULLY,
    payload,
  };
};
const bookServiceFailed = (errMess) => {
  return {
    type: BookingActionTypes.BOOK_SERVICE_FAILED,
    payload: errMess,
  };
};

export const resetBookingDetails = () => (dispatch) => {
  dispatch({ type: BookingActionTypes.RESET_BOOKING_DETAILS });
};
