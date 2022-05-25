import * as AuthActionTypes from "../../types/auth";
import { api } from "../../../../api/api";

export const login = (loginDetails) => (dispatch) => {
  const data = new URLSearchParams({
    account: loginDetails.username,
    password: loginDetails.password,
  });

  return fetch(`${api}api/account/login`, {
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
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(loginFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.accountData?.length && response.userData?.length) {
        const accountData = response.accountData[0];
        const userData = response.userData[0];
        const account = { ...accountData, ...userData };
        dispatch(loginSuccessfully(account));
      } else {
        dispatch(loginFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Login error: ", error);
    });
};

const loginSuccessfully = (account) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESSFULLY,
    payload: account,
  };
};

const loginFailed = (errMess) => {
  return {
    type: AuthActionTypes.LOGIN_FAILED,
    payload: errMess,
  };
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccessfully());
};

const logoutSuccessfully = (message) => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESSFULLY,
    payload: message,
  };
};

export const register = (account) => (dispatch) => {
  const data = new URLSearchParams({
    ...account,
  });

  return fetch(`${api}api/account/add/customer`, {
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
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          const errMess = (await response.json()).message;
          dispatch(registerFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((response) => {
      if (response.account && response.message) {
        dispatch(
          registerSuccessfully({
            account: response.account,
            successMessage: response.message,
          })
        );
      } else {
        dispatch(registerFailed(response.message));
      }
    })
    .catch((error) => {
      console.log("Login error: ", error);
    });
};

const registerSuccessfully = (payload) => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESSFULLY,
    payload,
  };
};

const registerFailed = (errMess) => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILED,
    payload: errMess,
  };
};

export const registerSalon = (account) => (dispatch) => {
  console.log(account)
  const data = new FormData();
  data.append("account_name", account.account_name);
  data.append("password", account.password);
  data.append("phone", account.phone);
  data.append("role", account.role);
  data.append("city", account.city);
  data.append("district", account.district);
  data.append("detailAddress", account.detailAddress);
  data.append("taxCode", account.taxCode);
  data.append("nameSalon", account.nameSalon);
  data.append("timeOpen", account.timeOpen);
  data.append("timeClose", account.timeClose);
  data.append("image", account.image);
  data.append("email", account.email);
  data.append("description", account.description);
  data.append("nameOwner", account.nameOwner);
  return fetch(`${api}api/account/register/salon`, {
    method: "POST",
    body: data,
    headers: {
     
    },
  })
    .then(
      async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          var error = new Error("Error" + res.status + ":" + res.statusText);
          const errMess = (await res.json()).message;
          dispatch(registerSalonFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((res) => {
      if (res.data_account && res.message) {
        dispatch(
          registerSalonSuccessfully({
            account: res.data_account,
            successMessage: res.message,
          })
        );
      } else {
        dispatch(registerSalonFailed(res.message));
      }
    })
    .catch((error) => {
      console.log("Registered salon error", error);
    });
};

const registerSalonSuccessfully = (payload) => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESSFULLY,
    payload,
  };
};

const registerSalonFailed = (errMess) => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILED,
    payload: errMess,
  };
};

export const forgotPassword = (account, callback) => (dispatch) => {
  const data = new URLSearchParams({
    ...account,
  });
  return fetch(`${api}api/account/forgotPassword`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then(
      async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          var error = new Error("Error" + res.status + ":" + res.statusText);
          const errMess = (await res.json()).message;
          dispatch(forgotPasswordFailed(errMess));
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error);
        throw errMess;
      }
    )
    .then((res) => {
      if (res.data?.account_name && res.message) {
        dispatch(
          forgotPasswordSuccessfully({
            recoveredAccount: res.data?.account_name,
            successMessage: res.message,
          })
        );
        if (callback) {
          setTimeout(() => {
            callback();
          }, 1500);
        }
      } else {
        dispatch(registerSalonFailed(res.message));
      }
    })
    .catch((error) => {
      console.log("Recovered salon error", error);
    });
};

const forgotPasswordSuccessfully = (payload) => {
  return {
    type: AuthActionTypes.RECOVER_PASSWORD_SUCCESSFULLY,
    payload,
  };
};
const forgotPasswordFailed = (errMess) => {
  return {
    type: AuthActionTypes.RECOVER_PASSWORD_FAILED,
    payload: errMess,
  };
};
