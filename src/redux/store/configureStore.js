import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  LoginAccount,
  RegisterAccount,
  RegisterSalon,
  ForgotPassword,
} from "../reducers/auth";
import {
  ReviewOfSalonByCustomer,
  VoteOfSalonByCustomer,
  AddFeedBack,
} from "../reducers/customer";
import {
  Booking,
  Salon,
  Service,
  Staff,
  StaffCalendar,
  HistoryBooking,
} from "../reducers/booking";
import {
  SheduleCurent,
  SalonHistory,
  ListStaffSalon,
  ListService,
  ProfileSalon,
  AddNewService,
  EditStaff,
  EditService,
  EditBusinessInfo,
  EditSalonInfo,
  VoteOfSalon,
  ReviewOfSalon,
  EditServiceFirebase,
  EditSalonBusinessInfoFirebase,
} from "../reducers/salon";
import {
  ListSalonActive,
  ListSalonDeactive,
  ListSalonRequest,
} from "../reducers/admin";

import { Profile } from "../reducers/profile";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const loginConfig = {
  key: "loginAccount",
  storage: storageSession,
  blacklist: ["errMess"],
};

const bookingConfig = {
  key: "booking",
  storage: storageSession,
  blacklist: ["errMess"],
};

const rootReducer = combineReducers({
  loginAccount: persistReducer(loginConfig, LoginAccount),
  registerAccount: RegisterAccount,
  registerSalon: RegisterSalon,
  recoverAccount: ForgotPassword,
  salon: Salon,
  service: Service,
  staff: Staff,
  staffCalendar: StaffCalendar,
  booking: persistReducer(bookingConfig, Booking),
  historyBooking: HistoryBooking,
  profile: Profile,
  scheduleCurent: SheduleCurent,
  salonHistory: SalonHistory,
  listStaffSalon: ListStaffSalon,
  listServiceSalon: ListService,
  profileSalon: ProfileSalon,
  addNewService: AddNewService,
  editStaffProfile: EditStaff,
  editService: EditService,
  editBusinessInfo: EditBusinessInfo,
  editSalonInfo: EditSalonInfo,
  voteOfSalon:VoteOfSalon,
  reviewOfSalon:ReviewOfSalon,
  editServiceFirebase: EditServiceFirebase,
  editSalonBusinessInfoFirebase:EditSalonBusinessInfoFirebase,
  //admin
  litSalonActivated: ListSalonActive,
  listSalonDeactive: ListSalonDeactive,
  listSalonRequest: ListSalonRequest,

  //customer
  voteOfSalonByCustomer:VoteOfSalonByCustomer,
  reviewOfSalonByCustomer:ReviewOfSalonByCustomer,
  addFeedBack:AddFeedBack,
});

export const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return { persistor, store };
};
