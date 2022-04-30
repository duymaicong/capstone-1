import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceLists from "../../components/mockUp/serviceData.json";
import fakeReviews from "../../components/mockUp/review.json";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";

import {
  getListServiceForSalon,
  resetListServiceOfSalon,
  getProfileOfSalon,
  addService,
} from "../../redux/actions/creators/salon";
import { currencyFormatter } from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";

import { Modal, Box, Tooltip } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function ManageService() {
  //create state for add service
  const [serviceName, setServiceName] = useState("");
  const [serviceTime, setServiceTime] = useState(15);
  const [price, setPrice] = useState("");
  const [promotion, setPromotion] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imageService, setImageService] = useState("");

  //create state for error
  const [error, setError] = useState(false);
  const [priceError, setPiceError] = useState(false);
  const [promotioError, setPromotionError] = useState(false);

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
      image: imageService,
    };
    let pass = true;
    if (
      serviceName === "" ||
      price === "" ||
      serviceTime === "" ||
      promotion === "" ||
      content === "" ||
      description === "" ||
      imageService === ""
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
      console.log(newService);
      resetAddServiceForm();
      const successCallback = () => {
        console.log("success callback");
        dispatch(resetListServiceOfSalon());
        handleCloseService();
        dispatch(getListServiceForSalon(token));
      };
      dispatch(addService(token, newService, successCallback));
    }
  };

  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
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

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // -- MODAL SERVICE --
  const [openService, setOpenSerive] = useState(false);
  const handleOpenService = () => setOpenSerive(true);
  const handleCloseService = () => {
    setOpenSerive(false);
  };

  // -- MODAL EDIT SERVICE --
  const [openEditService, setOpenEditService] = useState(false);
  const handleOpenEditService = () => setOpenEditService(true);
  const handleCloseEditService = () => setOpenEditService(false);

  // -- MODAL DELETE SERVICE --
  const [openDeleteService, setOpenDeleteSerive] = useState(false);
  const handleOpenDeleteService = () => setOpenDeleteSerive(true);
  const handleCloseDeleteService = () => setOpenDeleteSerive(false);

  // -- MODAL SALON --
  const [openSalon, setOpenSalon] = useState(false);
  const handleOpenSalon = () => setOpenSalon(true);
  const handleCloseSalon = () => setOpenSalon(false);

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
                              Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                              {salon.timeClose.slice(0, -3)}
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
                          <p>{salon.description}</p>
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
                    <form action="" method="post" className="editSalon">
                      <fieldset>
                        <div
                          className="has-text-right"
                          style={{ marginRight: "100px" }}
                        >
                          <br></br>
                          <label className="mt-5" for="TimeOpen">
                            Salon open time:
                          </label>
                          <input
                            id="TimeOpen"
                            className="input mt-5 w-50 ml-5"
                            style={{ height: "30px" }}
                            type="time"
                            placeholder="Text input"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="TimeClose">
                            Salon close time:
                          </label>
                          <input
                            id="TimeClose"
                            className="input mt-5 w-50 ml-5"
                            style={{ height: "30px" }}
                            type="time"
                            placeholder="Text input"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="Description">
                            Description:
                          </label>
                          <textarea
                            id="Description"
                            style={{ resize: "none" }}
                            className=" mt-5 w-50 ml-5"
                            placeholder="Text input"
                            rows="5"
                          />{" "}
                          <br></br>
                          <label className="mt-5" for="picture">
                            Salon's picture:
                          </label>
                          <input
                            id="picture"
                            className="mt-5 ml-5"
                            type="file"
                            accept="image/*"
                          />
                        </div>{" "}
                        <br></br>
                        <div className="has-text-right">
                          <button
                            className="button is-rounded is-danger"
                            onClick={handleCloseSalon}
                          >
                            {" "}
                            Cancel
                          </button>
                          <input
                            className="button is-rounded is-info ml-5"
                            type="submit"
                            value="Add"
                          ></input>
                        </div>
                      </fieldset>
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
                            height: "12rem",
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
                                  onClick={handleOpenDeleteService}
                                  className="button mr-3 mt-3 is-danger is-rounded is-small"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </Tooltip>
                              <br></br>
                              <Tooltip title="Edit" placement="right">
                                <button
                                  onClick={handleOpenEditService}
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
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                value={imageService}
                                onChange={(event) => {
                                  setImageService(event.target.value);
                                }}
                                placeholder="Image*"
                              />
                            </div>
                            <div>
                              <label>Description:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
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
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                value={imageService}
                                onChange={(event) => {
                                  setImageService(event.target.value);
                                }}
                                placeholder="Image*"
                              />
                            </div>
                            <div>
                              <label>Description:</label>
                            </div>
                            <div className="form-outline mb-4">
                              <textarea
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

                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseEditService}
                              >
                                {" "}
                                Cancel
                              </button>
                              <button className="button is-rounded is-primary ml-4">
                                {" "}
                                Add
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
                      <div className=" columns">
                        <div className="column is-3 has-text-centered">
                          <p className="has-text-info">
                            {" "}
                            <span className="is-size-4 has-text-weight-semibold">
                              4.5
                            </span>
                            <br></br>
                            out of 5<br></br>
                            156 reviews
                          </p>
                        </div>
                        <div className="column is-9 has-text-centered mt-3">
                          <button
                            style={{
                              border: " 1px solid darkblue",
                              borderRadius: "50%",
                              height: "70px",
                            }}
                            className="button  is-link is-light mr-4 is-medium"
                          >
                            5
                            <i
                              class="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          </button>
                          <button
                            style={{
                              border: " 1px solid darkblue",
                              borderRadius: "50%",
                              height: "70px",
                            }}
                            className="button  is-link is-light mr-4 is-medium"
                          >
                            4
                            <i
                              class="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          </button>
                          <button
                            style={{
                              border: " 1px solid darkblue",
                              borderRadius: "50%",
                              height: "70px",
                            }}
                            className="button  is-link is-light mr-4 is-medium"
                          >
                            3
                            <i
                              class="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          </button>
                          <button
                            style={{
                              border: " 1px solid darkblue",
                              borderRadius: "50%",
                              height: "70px",
                            }}
                            className="button  is-link is-light mr-4 is-medium"
                          >
                            2
                            <i
                              class="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          </button>
                          <button
                            style={{
                              border: " 1px solid darkblue",
                              borderRadius: "50%",
                              height: "70px",
                            }}
                            className="button  is-link is-light mr-4 is-medium"
                          >
                            1
                            <i
                              class="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          </button>
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
                      {fakeReview?.map((review) => (
                        <div
                          className="m-4  "
                          style={{
                            backgroundColor: "white",
                            height: "10rem",
                            borderRadius: "25px",
                          }}
                        >
                          <h1 className="ml-3 is-size-4">
                            <span className="is-size-3 mt-5 has-text-weight-semibold">
                              {review.nameCustomer}{" "}
                            </span>
                            - {review.wsend}
                          </h1>
                          <p className="ml-3 is-size-5"> {review.dateCreate}</p>
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
                          <p className="ml-3"> {review.conntent}</p>
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
