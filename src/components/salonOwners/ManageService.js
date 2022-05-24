import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import { districts, times } from "../../assets/data/data.js";
import { validEmail, validPhone } from "../../validations/regex";
// import axios from "axios";


import {
  getListServiceForSalon,
  resetListServiceOfSalon,
  getProfileOfSalon,
  addService,
  deleteService,
  editService,
  editSalonInfo,
  getVoteOfSalon,
  resetReviewOfSalon,
  getReviewOfSalon,
} from "../../redux/actions/creators/salon";
import {
  convertISOStringToLocaleTimeString,
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";

import { Modal, Box, Tooltip, Rating, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { set } from "date-fns";

// -- MODAL CSS --
const modalcss = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
const btnTime = {
  width: "2rem",
  height: "2.3rem",
  textAlign: "center",
  borderRadius: "15%",
};

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function ManageService() {


  //create state for add service
  const [serviceName, setServiceName] = useState("");
  const [serviceTime, setServiceTime] = useState(15);
  const [price, setPrice] = useState("");
  const [promotion, setPromotion] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imageService, setImageService] = useState("");

  const [messageAddService,setMessageAddService]= useState("")


  // search review by star
  const [starSearch, setStar] = useState("");

  const handleGetReviewByStar = (e) => {
    e.preventDefault();
    var star = e.target.value;
    console.log(star)
    dispatch(resetReviewOfSalon());
    dispatch(getReviewOfSalon(token, { star: star }));

  };

  //create state for error
  const [error, setError] = useState(false);
  const [priceError, setPiceError] = useState(false);
  const [promotioError, setPromotionError] = useState(false);

  //STATE EDIT SERVICE
  const [serviceInfo, setServiceInfo] = useState(undefined);




  //setServiceTime,
  const addTime = () => {
    setServiceTime(serviceTime + 15);
  };
  const minusTime = () => {
    if (serviceTime >= 30) {
      setServiceTime(serviceTime - 15);
    } else {
      setServiceTime(15);
    }
  };

  const addTimeEdit = () => {
    if (!serviceInfo) {
      return;
    } else {
      setServiceInfo({
        ...serviceInfo,
        service_time: serviceInfo.service_time + 15,
      });
    }
  };

  const minusTimeEdit = (time) => {
    if (!serviceInfo) return;
    if (serviceInfo?.service_time >= 30) {
      setServiceInfo({
        ...serviceInfo,
        service_time: serviceInfo.service_time - 15,
      });
    } else {
      setServiceInfo({
        ...serviceInfo,
        service_time: 15,
      });
    }
  };

  //reset form
  const resetAddServiceForm = () => {
    setServiceName("");
    setServiceTime(15);
    setPrice("");
    setPromotion("");
    setContent("");
    setDescription("");
    setImageService("");
  };

  //add new service
  const handleAddService = (e) => {
    e.preventDefault();
    setError(false);
    setPiceError(false);
    setPromotionError(false);



    const newService = {
      name: serviceName,
      price: price,
      service_time: serviceTime,
      promotion: promotion,
      content: content,
      description: description,
      image: imageService
    };
    let pass = true;
    if (
      serviceName === "" ||
      price === "" ||
      serviceTime === "" ||
      promotion === "" ||
      content === "" ||
      description === ""

    ) {
      setError(true);
      pass = false;
      return;
    }
    if (price <= 0) {
      setPiceError(true);
      pass = false;
    }
    if (promotion < 0) {
      setPromotionError(true);
      pass = false;
    }



    if (pass) {


      const successCallback = (mess) => {
        resetAddServiceForm();
        console.log("success callback");
        dispatch(resetListServiceOfSalon());
        dispatch(getListServiceForSalon(token));
        setTimeout(handleCloseService(), 1000)

      };
      const errCallback = (mess) => {
        if (mess=="Could not upload the file: undefined. TypeError: Cannot read properties of undefined (reading 'originalname')") {
          setMessageAddService("chọn ảnh để tạo service")
        } else if(mess=='Could not upload the file: undefined. Error: Only .png, .jpg and .jpeg format allowed!') {
          setMessageAddService("chọn file ảnh .png, .jpg and .jpeg để tạo service")
        }else{
          setMessageAddService(mess)
        }
        
 
        console.log("err callback");
        // dispatch(resetListServiceOfSalon());
        // // handleCloseService();
        // dispatch(getListServiceForSalon(token));
      };
      dispatch(addService(token, newService, successCallback, errCallback));

    }
  };

  const dispatch = useDispatch();
  // -- FIXED DATA --
  // const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;

  // -- API DATA --
  const { listService } = useSelector((state) => state.listServiceSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  useEffect(() => {
    dispatch(getListServiceForSalon(token));
    return () => {
      dispatch(resetListServiceOfSalon());
    };
  }, [dispatch, token]);

  // -- GET SALON PROFILE --
  const { profileSalon } = useSelector((state) => state.profileSalon);

  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch, token]);

  // -- Get vote of salon
  const { voteOfSalon } = useSelector((state) => state.voteOfSalon);

  useEffect(() => {
    dispatch(getVoteOfSalon(token));
  }, [dispatch, token]);

  // -- Get review of salon
  const { reviewOfSalon, messageReview } = useSelector((state) => state.reviewOfSalon);

  useEffect(() => {
    dispatch(getReviewOfSalon(token, { star: starSearch }));

  }, [dispatch, token]);

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // -- MODAL SERVICE --
  const [openService, setOpenSerive] = useState(false);
  const handleOpenService = () => setOpenSerive(true);
  const handleCloseService = () => {
    setOpenSerive(false);
    resetAddServiceForm();
  };

  // -- MODAL EDIT SERVICE --
  const [openEditService, setOpenEditService] = useState(false);
  const handleOpenEditService = (serviceInfo) => {
    setOpenEditService(true);
    setServiceInfo(serviceInfo);
  };
  const handleCloseEditService = () => {
    setOpenEditService(false);
    setServiceInfo(undefined);
  };

  // -- MODAL DELETE SERVICE --
  const [openDeleteService, setOpenDeleteSerive] = useState(false);
  const handleOpenDeleteService = (data) => {
    setOpenDeleteSerive(true);
    setServiceDeleteSelected(data);
  };
  const handleCloseDeleteService = () => {
    setOpenDeleteSerive(false);
    setServiceDeleteSelected("");
  };

  //STATE DELETE SERVICE
  const [serviceDeleteSelected, setServiceDeleteSelected] = useState("");

  //DELETE SERVICE
  const hanldeDeleteService = () => {
    if (!serviceDeleteSelected) return;
    const successCallback = () => {
      dispatch(resetListServiceOfSalon());
      handleCloseDeleteService();
      dispatch(getListServiceForSalon(token));
    };
    dispatch(
      deleteService(
        token,
        { serviceId: serviceDeleteSelected.serviceId },
        successCallback
      )
    );
  };

  //CALL SUCESSMESS EDIT SERVICE
  const { serviceEdited, successMess } = useSelector(
    (state) => state.editService
  );
  //CALL SUCESSMESS EDIT SERVICE
  const { addNewService } = useSelector(
    (state) => state.addNewService
  );

  // STATE ERROR FOR EDIT SERVICE
  const [editError, setEditError] = useState(null);

  //EDIT SERVICE
  const handleEditService = (event) => {
    event.preventDefault();
    const {
      name,
      price,
      service_time,
      promotion,
      content,
      description,
      image,
    } = serviceInfo;
    console.log(serviceInfo);
    if (
      !name ||
      !price ||
      !service_time ||
      !content ||
      !description ||
      !image
    ) {
      setEditError("Please enter all the fields!");
      return;
    }
    if (price <= 0) {
      setEditError("Price is a number greater than 0.");
    }
    if (promotion < 0) {
      setEditError("Promotion is a number greater than or equal to 0..");
    }
    setEditError(null);
    const submitServiceObject = {
      name,
      price,
      service_time,
      promotion,
      content,
      description,
      image,
    };
    const successCallback = () => {
      handleCloseEditService();
      dispatch(resetListServiceOfSalon());
      dispatch(getListServiceForSalon(token));
    };
    dispatch(
      editService(
        token,
        submitServiceObject,
        successCallback,
        serviceInfo.serviceId
      )
    );
  };

  // -- MODAL EDIT PROFILE SALON --
  const [openSalon, setOpenSalon] = useState(false);
  const handleOpenSalon = () => setOpenSalon(true);
  const handleCloseSalon = () => setOpenSalon(false);

  // -- RATING --
  const [valueRating, setValueRating] = React.useState(2);

  //STATE EDIT BUSINESS INFO
  const [businessInfo, setBusinessInfo] = useState(null);

  //LOAD BUSINESS INFO
  useEffect(() => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
    }
  }, [profileSalon]);

  // VALIDATE ERROR MESSAGE STATE
  const [emptyError, setEmptyError] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  // CALL EDIT SALON FROM REDUX
  const { salonInfoEdited, successMessage, errMessage } = useSelector(
    (state) => state.editSalonInfo
  );

  // EDIT SALON INFO
  const handleEditSalonInfo = (e) => {
    e.preventDefault();
    setEmptyError(false);
    setPhoneErr(false);
    const {
      nameSalon,
      phone,
      timeOpen,
      timeClose,
      district,
      city,
      detailAddress,
      image,
      description,
    } = businessInfo;

    if (
      !nameSalon ||
      !description ||
      !phone ||
      !district ||
      !city ||
      !detailAddress ||
      !timeOpen ||
      !timeClose ||
      !image
    ) {
      setEmptyError(true);
      return;
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      return;
    }
    setEmptyError(false);
    setPhoneErr(false);
    const submitOjb = {
      nameSalon,
      phone,
      timeOpen,
      timeClose,
      district,
      city,
      detailAddress,
      image,
      description,
    };
    console.log(submitOjb);
    const callback = () => {
      handleCloseSalon();
      dispatch(getProfileOfSalon(token));
    };
    dispatch(editSalonInfo(token, submitOjb, callback));
  };

  return (
    <div>
      {" "}
      <div style={root}>

        <div className="columns">
          <div className="column is-3"></div>
          <div
            className="column is-6 mt-5 p-0"
            style={{ boxShadow: "1px 1px 20px black" }}
          >

            <div
              className="p-0 container"
              style={{ backgroundColor: "#FBE8CA" }}
            >
              <div>
                {profileSalon?.map((salon) => (
                  <div
                    className=""
                    style={{ background: "url(" + patterbg + ")" }}
                    key={salon.salonId}
                  >
                    <div className="columns mt-0 pt-0">
                      <div
                        className="column is-6"
                        style={{ paddingTop: "0px" }}
                      >
                        <img
                          style={{ height: "100%", width: "auto" }}
                          src={salon.image}
                          alt="..."
                        />
                      </div>
                      <div className="column is-6 pt-3">
                        <div className="pb-2 mb-3">
                          <h2
                            style={{ color: "#134068" }}
                            className="is-size-1 has-text-weight-semibold"
                          >
                            {salon.nameSalon}
                          </h2>
                          <p className="is-size-5 font-weight-bold">
                            Open:{" "}
                            <span className="text-danger">
                              Mon-Sun {salon.timeOpen} - {salon.timeClose}
                            </span>
                          </p>
                          <p>
                            <span className="is-size-5 font-weight-bold">
                              Phone number:{" "}
                            </span>
                            <span
                              className="is-size-5 is-underlined"
                              style={{ color: "#134068" }}
                            >
                              {salon.phone}
                            </span>
                          </p>
                          <p>
                            <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                            <span
                              className="is-size-5 font-weight-bold"
                              style={{ color: "#134068" }}
                            >
                              {salon.detailAddress}
                            </span>
                          </p>
                          <div>
                            <span>{salon.description}</span>
                          </div>
                        </div>
                        <div className="has-text-right mb-5 mr-5">
                          <button
                            style={{ width: "120px" }}
                            className="button is-info is-rounded"
                            onClick={handleOpenSalon}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Modal Salon */}
              <Modal
                open={openSalon}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalcss}>
                  <div>
                    <form>
                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              Salon's name
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.nameSalon}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                nameSalon: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              Phone
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.phone}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                phone: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {phoneErr && (
                          <p className="text-danger">Your phone is invalid!</p>
                        )}
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect01"
                            >
                              District
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                district: e.target.value,
                              });
                            }}
                          >
                            <option defaultValue={businessInfo?.district}>
                              {businessInfo?.district}
                            </option>
                            {districts.map((district) => (
                              <option
                                key={district.toString()}
                                value={district}
                              >
                                {district}
                              </option>
                            ))}
                          </select>
                          <div className="input-group-prepend ml-3">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect02"
                            >
                              City
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect02"
                          >
                            <option value={businessInfo?.city}>
                              {businessInfo?.city}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              Address
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={40}
                            value={businessInfo?.detailAddress}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                detailAddress: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect03"
                            >
                              Open
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect03"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                timeOpen: e.target.value,
                              });
                            }}
                          >
                            <option defaultValue={businessInfo?.timeOpen}>
                              {businessInfo?.timeOpen}
                            </option>
                            {times.map((time) => (
                              <option key={time.toString()} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <div className="input-group-prepend ml-3">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect04"
                            >
                              Close
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect04"
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                timeClose: e.target.value,
                              });
                            }}
                          >
                            <option value={businessInfo?.timeClose}>
                              {businessInfo?.timeClose}
                            </option>
                            {times.map((time) => (
                              <option key={time.toString()} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="">
                              Salon's image
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={2000}
                            value={businessInfo?.image}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                image: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Description:
                          </label>
                          <textarea
                            value={businessInfo?.description}
                            type="text"
                            className="form-control"
                            maxLength={2000}
                            onChange={(e) => {
                              setBusinessInfo({
                                ...businessInfo,
                                description: e.target.value,
                              });
                            }}
                            placeholder="Description for your salon"
                            style={{ minHeight: "10rem" }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        {successMessage && (
                          <p className="text-success">
                            Edit salon info successfully
                          </p>
                        )}
                        {errMessage && (
                          <p className="text-danger">{errMessage}</p>
                        )}
                        {emptyError && (
                          <p className="text-danger">
                            Please enter all the fields
                          </p>
                        )}
                      </div>

                      <div className="has-text-right">
                        <button
                          className="button is-rounded is-danger"
                          onClick={handleCloseSalon}
                        >
                          {" "}
                          Cancel
                        </button>
                        <button
                          className="button is-rounded is-primary ml-4"
                          onClick={handleEditSalonInfo}
                        >
                          {" "}
                          Edit
                        </button>
                      </div>
                    </form>
                  </div>
                </Box>
              </Modal>
              <div style={{ background: "url(" + paperbg + ")" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <TabList
                      variant="fullWidth"
                      onChange={handleChange}
                      aria-label="disabled tabs example"
                    >
                      <Tab label="Services" value="1" />
                      <Tab label="Review" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div>
                      <div className="has-text-right mb-5">
                        <button
                          className="button is-info is-rounded"
                          onClick={handleOpenService}
                        >
                          Add a service
                        </button>
                      </div>
                      {listService?.map((service) => (
                        <div
                          className="card mb-3"
                          style={{
                            backgroundColor: " #F5F3ED",
                            minHeight: "12rem",
                            borderRadius: "25px",
                          }}
                          key={service.serviceId}
                        >
                          <div className="columns">
                            <div className="column is-3">
                              <img
                                src={
                                  service.image
                                    ? service.image
                                    : imageUnavailable
                                }
                                alt="..."
                                style={{
                                  height: "100%",
                                  width: "100%  ",
                                  maxHeight: "12rem",
                                  borderRadius: "25px",
                                }}
                              />
                            </div>
                            <div className="column is-7 mt-2 has-text-left">
                              <div>
                                <h4 className="has-text-info-dark is-size-3 has-text-weight-bold">
                                  {service.name}
                                </h4>
                                <p className="has-text-dark is-size-5">
                                  {service.service_time} minutes
                                </p>

                                {service.promotion === 0 && (
                                  <p className="has-text-danger has-text-weight-semibold">
                                    {" "}
                                    {currencyFormatter.format(
                                      service.price
                                    )}{" "}
                                  </p>
                                )}

                                {service.promotion !== 0 && (
                                  <p className="has-text-grey-light has-text-weight-semibold">
                                    <del>
                                      {" "}
                                      {currencyFormatter.format(
                                        service.price
                                      )}{" "}
                                    </del>

                                    <span className="has-text-danger-dark has-text-weight-semibold">
                                      {" "}
                                      {currencyFormatter.format(
                                        service.price -
                                        (service.price / 100) *
                                        service.promotion
                                      )}{" "}
                                    </span>
                                    <span className="tag is-danger has-text-weight-semibold">
                                      {" "}
                                      {service.promotion} %
                                    </span>
                                  </p>
                                )}

                                <p className="">{service.content}</p>
                                <p className="">{service.description}</p>
                              </div>
                            </div>
                            <div className="column is-2 has-text-right">
                              <Tooltip title="Delete" placement="right">
                                <button
                                  onClick={() =>
                                    handleOpenDeleteService(service)
                                  }
                                  className="button mr-3 mt-3 is-danger is-rounded is-small"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </Tooltip>
                              <br></br>
                              <Tooltip title="Edit" placement="right">
                                <button
                                  onClick={() => handleOpenEditService(service)}
                                  className="button mr-3 is-primary is-rounded  mt-3 is-small"
                                >
                                  <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Modal Service */}
                    <Modal
                      open={openService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div>
                          <form>
                            <div>
                              <label>Service's Name:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                value={serviceName}
                                onChange={(event) => {
                                  setServiceName(event.target.value);
                                }}
                                placeholder="Service's name*"
                              />
                            </div>
                            <div>
                              <label>Service's Time:</label>
                            </div>
                            <div className="input-group form-outline mb-4">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                disabled
                                value={serviceTime}
                                onChange={(event) => {
                                  setServiceTime(event.target.value);
                                }}
                                placeholder="Service's time"
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text rounded-right"
                                  id="basic-addon1"
                                >
                                  Minute
                                </span>
                              </div>
                              <div className="mt-1">
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white mr-1 ml-1"
                                  type="button"
                                  style={btnTime}
                                  onClick={addTime}
                                >
                                  +
                                </button>
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white"
                                  type="button"
                                  style={btnTime}
                                  onClick={minusTime}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-6">Price:</label>
                              <label className="col-6">Promotion:</label>
                            </div>
                            <div className="row">
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  value={price}
                                  min="0"
                                  onChange={(event) => {
                                    setPrice(event.target.value);
                                  }}
                                  placeholder="Price*"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    VND
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={promotion}
                                  onChange={(event) => {
                                    setPromotion(event.target.value);
                                  }}
                                  placeholder="Promotion*"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                {priceError && (
                                  <p className="text-danger">
                                    Price is a number greater than 0.
                                  </p>
                                )}
                              </div>
                              <div className="col-6">
                                {promotioError && (
                                  <p className="text-danger">
                                    Promotion is a number greater than or equal
                                    to 0
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label>Content:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                maxLength={40}
                                type="text"
                                className="form-control form-control-lg"
                                value={content}
                                onChange={(event) => {
                                  setContent(event.target.value);
                                }}
                                placeholder="Content*"
                              />
                            </div>
                            <div>
                              <label>Image:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { setImageService(e.target.files[0]) }} />
                              {/* <input
                                maxLength={2000}
                                type="text"
                                className="form-control form-control-lg"
                                value={imageService}
                                onChange={(event) => {
                                  setImageService(event.target.value);
                                }}
                                placeholder="Image*"
                              /> */}
                            </div>
                            <div>
                              <label>Description:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
                                maxLength={200}
                                rows={4}
                                cols={50}
                                type="text"
                                className="form-control form-control-lg"
                                value={description}
                                onChange={(event) => {
                                  setDescription(event.target.value);
                                }}
                                placeholder="Description"
                              />
                            </div>
                            <p className="text-success">{messageAddService}</p>

                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseService}
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                className="button is-rounded is-primary ml-4"
                                onClick={handleAddService}
                              >
                                {" "}
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>{" "}
                    {/* Modal Edit Service */}
                    <Modal
                      open={openEditService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div>
                          <form>
                            <div>
                              <label>Service's Name:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                maxLength={40}
                                className="form-control form-control-lg"
                                value={serviceInfo?.name}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    name: event.target.value,
                                  });
                                }}
                                placeholder="Service's name*"
                              />
                            </div>
                            <div>
                              <label>Service's Time:</label>
                            </div>
                            <div className="input-group form-outline mb-4">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                disabled
                                value={serviceInfo?.service_time}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    service_time: event.target.value,
                                  });
                                }}
                                placeholder="Service's time"
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text rounded-right"
                                  id="basic-addon1"
                                >
                                  Minute
                                </span>
                              </div>
                              <div className="mt-1">
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white mr-1 ml-1"
                                  type="button"
                                  style={btnTime}
                                  onClick={addTimeEdit}
                                >
                                  +
                                </button>
                                <button
                                  className="btn btn-outline-secondary bg-dark text-white"
                                  type="button"
                                  style={btnTime}
                                  onClick={minusTimeEdit}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-6">Price:</label>
                              <label className="col-6">Promotion:</label>
                            </div>
                            <div className="row">
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={serviceInfo?.price}
                                  onChange={(event) => {
                                    setServiceInfo({
                                      ...serviceInfo,
                                      price: event.target.value,
                                    });
                                  }}
                                  placeholder="Price*"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    VND
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 input-group form-outline mb-4">
                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  min="0"
                                  value={serviceInfo?.promotion}
                                  onChange={(event) => {
                                    setServiceInfo({
                                      ...serviceInfo,
                                      promotion: event.target.value,
                                    });
                                  }}
                                  placeholder="Promotion*"
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label>Content:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input
                                maxLength={40}
                                type="text"
                                className="form-control form-control-lg"
                                value={serviceInfo?.content}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    content: event.target.value,
                                  });
                                }}
                                placeholder="Content*"
                              />
                            </div>
                            <div>
                              <label>Image:</label>
                            </div>
                            <div className="form-outline mb-4">
                              {/* <input
                                maxLength={2000}
                                type="text"
                                className="form-control form-control-lg"
                                value={serviceInfo?.image}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    image: event.target.value,
                                  });
                                }}
                                placeholder="Image*"
                              /> */}
                              <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { setImageService(e.target.files[0]) }} />
                            </div>
                            <div>
                              <label>Description:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
                                maxLength={200}
                                rows={4}
                                cols={50}
                                type="text"
                                className="form-control form-control-lg"
                                value={serviceInfo?.description}
                                onChange={(event) => {
                                  setServiceInfo({
                                    ...serviceInfo,
                                    description: event.target.value,
                                  });
                                }}
                                placeholder="Description"
                              />
                            </div>

                            <div>
                              {successMess && (
                                <p className="text-success">{successMess}</p>
                              )}
                              {editError && (
                                <p className="text-danger">{editError}</p>
                              )}
                            </div>

                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseEditService}
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                className="button is-rounded is-primary ml-4"
                                onClick={handleEditService}
                              >
                                {" "}
                                Edit
                              </button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>
                    {/* Modal delete service */}
                    <Modal
                      open={openDeleteService}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalcss}>
                        <div className="has-text-centered">
                          <h1 className="is-size-4 has-text-weight-semibold">
                            {" "}
                            Do you want to{" "}
                            <span className="has-text-danger">delete</span> this
                            service ?
                          </h1>
                          <br></br>{" "}
                          <button
                            onClick={handleCloseDeleteService}
                            className="button is-rounded is-danger mr-5"
                            style={{ width: "150px" }}
                          >
                            Cancel
                          </button>
                          <button
                            className="button is-rounded is-info ml-5"
                            style={{ width: "150px" }}
                            onClick={hanldeDeleteService}
                          >
                            Delete
                          </button>
                        </div>
                      </Box>
                    </Modal>
                    {/*  */}
                  </TabPanel>
                  <TabPanel value="2">
                    <div>
                      <div className=" columns,mx-auto mb-4">
                        {voteOfSalon?.map((vote) => (
                          <p className="has-text-info">

                            {" "}

                            <span className="is-size-4 has-text-weight-semibold">
                              {(vote.AverangeVote).toFixed(1)}
                            </span>
                            <Rating
                              name="half-rating-read"
                              defaultValue={vote.AverangeVote}
                              precision={0.1}
                              readOnly
                            />

                            <br></br>
                            out of 5<br></br>
                            {vote.TotalVote} reviews
                          </p>
                        ))}
                        <div className="column is-9 has-text-left mt-3">
                          <p>{starSearch}</p>
                          <button style={{ border: " 1px solid darkblue" }} className="button is-rounded is-link is-light mr-4 is-medium"
                            onClick={handleGetReviewByStar} value="5">
                            5
                          </button>
                          <button style={{ border: " 1px solid darkblue" }} className="button is-rounded is-link is-light mr-4 is-medium"
                            onClick={handleGetReviewByStar} value="4">
                            4
                          </button>
                          <button style={{ border: " 1px solid darkblue" }} className="button is-rounded is-link is-light mr-4 is-medium"
                            onClick={handleGetReviewByStar} value="3">
                            3
                          </button>
                          <button style={{ border: " 1px solid darkblue" }} className="button is-rounded is-link is-light mr-4 is-medium"
                            onClick={handleGetReviewByStar} value="2">
                            2
                          </button>
                          <button style={{ border: " 1px solid darkblue" }} className="button is-rounded is-link is-light mr-4 is-medium"
                            onClick={handleGetReviewByStar} value="1">
                            1
                          </button>
                        </div>

                        <div
                          className="column is-9 has-text-centered mt-3"
                          style={{ display: "inline-block" }}
                        >



                        </div>

                      </div>
                      <hr
                        style={{
                          backgroundColor: "grey",
                          margin: "0px",
                          height: "1px",
                          opacity: "60%",
                        }}
                      ></hr>
                      {<p>{messageReview}</p>}
                      {reviewOfSalon?.map((review) => (


                        <div
                          className="m-4  "
                          style={{
                            backgroundColor: "white",
                            height: "10rem",
                            borderRadius: "25px",
                          }}
                        >
                          <h1 className="ml-3 is-size-4">
                            {review.nameCustomer}
                            - {review.wsend}
                          </h1>
                          <p className="ml-3 is-size-5">
                            {review.rate / 2}
                            <Rating
                              name="half-rating-read"
                              value={review.rate / 2}
                              precision={0.1}
                              readOnly
                            />
                          </p>
                          <p className="ml-3 is-size-5">
                            {convertISOStringToLocaleDateString(review.dateCreate)}
                          </p>
                          <hr
                            className="solid"
                            style={{
                              width: "95%",
                              marginTop: 5,
                              marginLeft: 10,
                              marginBottom: 0,
                              borderTop: 1 + "px solid grey",
                              opacity: 60 + "%",
                            }}
                          />
                          <p className="ml-3"> {review.content}</p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
          <div className="column is-3"></div>
        </div>
      </div>
    </div>
  );
}
