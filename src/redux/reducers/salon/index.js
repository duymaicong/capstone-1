import * as SalonActionTypes from "../../actions/types/salon/index";

export const SheduleCurent = (
  state = {
    currentSchedule: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_SCHEDULE_CURRENT_FAILED:
      return { ...state, currentSchedule: null, errMess: action.payload };
    case SalonActionTypes.GET_SCHEDULE_CURRENT_SUCCESSFULLY:
      return {
        ...state,
        currentSchedule: action.payload.currentSchedule,
        errMess: null,
      };
    case SalonActionTypes.RESET_SCHEDULE_CURRENT_LIST:
      return { ...state, currentSchedule: null, errMess: null };
    default:
      return state;
  }
};

export const SalonHistory = (
  state = {
    historyBooking: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_HISTORY_BOOKING_FAILED:
      return { ...state, historyBooking: null, errMess: action.payload };
    case SalonActionTypes.GET_HISTORY_BOOKING_SUCCESSFULLY:
      return {
        ...state,
        historyBooking: action.payload.historyBooking,
        errMess: null,
      };
    case SalonActionTypes.RESET_HISTORY_BOOKING_LIST:
      return { ...state, historyBooking: null, errMess: null };
    default:
      return state;
  }
};

export const ListStaffSalon = (
  state = {
    listStaff: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_STAFF_LIST_FOR_SALON_FAILED:
      return { ...state, listStaff: null, errMess: action.payload.errMess };
    case SalonActionTypes.GET_STAFF_LIST_FOR_SALON_SUCCESSFULLY:
      return { ...state, listStaff: action.payload.listStaff, errMess: null };
    case SalonActionTypes.RESET_STAFF_LIST_OF_SALON:
      return { ...state, listStaff: null, errMess: null };
    default:
      return state;
  }
};

export const ListService = (
  state = {
    listService: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_FAILED:
      return { ...state, listService: null, errMess: action.payload.errMess };
    case SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        listService: action.payload.listService,
        errMess: null,
      };
    case SalonActionTypes.RESET_SERVICE_LIST_OF_SALON:
      return { ...state, listService: null, errMess: null };
    default:
      return state;
  }
};

export const ProfileSalon = (
  state = {
    profileSalon: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.GET_PROFILE_FOR_SALON_FAILED:
      return { ...state, profileSalon: null, errMess: action.payload.errMess };
    case SalonActionTypes.GET_PROFILE_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        profileSalon: action.payload.profileSalon,
        errMess: null,
      };

    default:
      return state;
  }
};

export const AddNewService = (
  state = {
    newServiceAdded: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.ADD_NEW_SERVICE_FAILED:
      return {
        ...state,
        newServiceAdded: null,
        errMess: action.payload.errMess,
      };
    case SalonActionTypes.ADD_NEW_SERVICE_SUCCESSFULLY:
      return {
        ...state,
        newServiceAdded: action.payload.newServiceAdded,
        errMess: null,
      };

    default:
      return state;
  }
};

export const EditStaff = (
  state = {
    staffEdited: null,
    successMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.ADD_NEW_STAFF_FAILED:
      return {
        ...state,
        newStaffAdded: null,
        successMess: null,
        errMess: action.payload.errMess,
      };
    case SalonActionTypes.ADD_NEW_STAFF_SUCCESSFULLY:
      return {
        ...state,
        newStaffAdded: action.payload.newStaffAdded,
        successMess: action.payload.successMess,
        errMess: null,
      };

    default:
      return state;
  }
};
export const AddNewStaff = (
  state = {
    newStaffAdded: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.ADD_NEW_STAFF_FAILED:
      return { ...state, newStaffAdded: null, errMess: action.payload.errMess };
    case SalonActionTypes.ADD_NEW_STAFF_SUCCESSFULLY:
      return {
        ...state,
        newStaffAdded: action.payload.newStaffAdded,
        errMess: null,
      };

    default:
      return state;
  }
};

export const EditService = (
  state = {
    serviceEdited: null,
    successMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.EDIT_SERVICE_FAILED:
      return {
        ...state,
        serviceEdited: null,
        successMess: null,
        errMess: action.payload.errMess,
      };
    case SalonActionTypes.EDIT_SERVICE_SUCCESSFULLY:
      return {
        ...state,
        serviceEdited: action.payload.serviceEdited,
        successMess: action.payload.successMess,
        errMess: null,
      };
    case SalonActionTypes.GET_SERVICE_LIST_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        serviceEdited: null,
        successMess: null,
        errMess: null,
      };
    default:
      return state;
  }
};


export const EditBusinessInfo = (
  state = {
    businessInfoEdited: null,
    successMess: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.EDIT_SALON_BUSINESS_INFO_FAILED:
      return {
        ...state,
        businessInfoEdited: null,
        successMess: null,
        errMess: action.payload,
      };
    case SalonActionTypes.EDIT_SALON_BUSINESS_INFO_SUCCESSFULLY:
      return {
        ...state,
        businessInfoEdited: action.payload.businessInfoEdited,
        successMess: action.payload.successMess,
        errMess: null,
      };
    case SalonActionTypes.GET_PROFILE_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        businessInfoEdited: null,
        successMess: null,
        errMess: null,
      };
    default:
      return state;
  }
};

export const EditSalonInfo = (
  state = {
    salonInfoEdited: null,
    successMess: null,
    errMessage: null,
  },
  action
) => {
  switch (action.type) {
    case SalonActionTypes.EDIT_SALON_INFO_FAILED:
      return {
        ...state,
        salonInfoEdited: null,
        successMess: null,
        errMessage: action.payload,
      };
    case SalonActionTypes.EDIT_SALON_INFO_SUCCESSFULLY:
      return {
        ...state,
        salonInfoEdited: action.payload.salonInfoEdited,
        successMess: action.payload.successMess,
        errMessage: null,
      };
    case SalonActionTypes.GET_PROFILE_FOR_SALON_SUCCESSFULLY:
      return {
        ...state,
        salonInfoEdited: null,
        successMess: null,
        errMessage: null,
      };
    default:
      return state;
  }
};