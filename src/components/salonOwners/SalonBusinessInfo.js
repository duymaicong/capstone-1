import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import imageUnavailable from "../../assets/image-unavailable.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileOfSalon,
  editSalonBusinessInfo,
} from "../../redux/actions/creators/salon";
import { Modal, Box, Tooltip } from "@mui/material";
import { logout } from "../../redux/actions/creators/auth";
import { districts, times } from "../../assets/data/data.js";
import { validEmail, validPhone } from "../../validations/regex";
// CSS

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function SalonDashboard() {
  const dispatch = useDispatch();

  // -- GET SALON PROFILE --
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { profileSalon } = useSelector((state) => state.profileSalon);
  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch, token]);

  // -- MODAL --
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
    }
    setOpen(false);
  };

  //LOAD REDUX EDIT BUSINESS INFO
  const { businessInfoEdited, successMess, errMess } = useSelector(
    (state) => state.editBusinessInfo
  );
  //STATE EDIT BUSINESS INFO
  const [businessInfo, setBusinessInfo] = useState(null);

  //LOAD BUSINESS INFO
  useEffect(() => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
    }
  }, [profileSalon]);

  //VALIDATION ERROR
  const [emptyError, setEmptyError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  //EDIT BUSINESS INFO
  const handleEditBusinessInfo = (e) => {
    e.preventDefault();
    setEmptyError(false);
    setEmailErr(false);
    setPhoneErr(false);
    const {
      nameSalon,
      nameOwner,
      email,
      phone,
      taxCode,
      district,
      city,
      detailAddress,
      timeOpen,
      timeClose,
      image,
    } = businessInfo;

    if (
      !nameSalon ||
      !nameOwner ||
      !email ||
      !phone ||
      !taxCode ||
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
    if (!validEmail.test(email)) {
      setEmailErr(true);
      return;
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      return;
    }
    setEmptyError(false);
    setEmailErr(false);
    setPhoneErr(false);
    const submitOjb = {
      nameSalon,
      nameOwner,
      email,
      phone,
      taxCode,
      district,
      city,
      detailAddress,
      timeOpen,
      timeClose,
      image,
    };
    
    const successCallback = () => {
      handleClose();
      dispatch(getProfileOfSalon(token));
    };
    dispatch(editSalonBusinessInfo(token, submitOjb, successCallback));
  };

  return profileSalon ? (
    <div>
      <div style={root}>
        <div
          className="columns"
          style={{
            minHeight: "400px",
            // , marginTop: "96px"
          }}
        >
          <div className="column is-2"></div>
          <div
            className="column is-8  has-text-centered "
            style={{
              background: "url(" + paperbg + ")",
              // backgroundColor :"#f5f4eb",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <h1 className="is-size-1 mt-5 mb-5">Salon Business Information</h1>
            <div className="columns">
              <div className="column is-6 has-text-right">
                <p className="is-size-4">Salon Id : </p>
                <p className="is-size-4">Salon name : </p>
                <p className="is-size-4">Salon owner : </p>
                <p className="is-size-4">Tax code : </p>
                <p className="is-size-4">Phone number : </p>
                <p className="is-size-4">Time open : </p>
                <p className="is-size-4">Time close : </p>
                <p className="is-size-4">District : </p>
                <p className="is-size-4">City : </p>
                <p className="is-size-4">Detail address : </p>
                <p className="is-size-4">Email : </p>
                <p className="is-size-4">Salon image : </p>
              </div>
              <div className="column is-6 has-text-left">
                <p className="is-size-4">{profileSalon[0].salonId}</p>
                <p className="is-size-4">{profileSalon[0].nameSalon}</p>
                <p className="is-size-4"> {profileSalon[0].nameOwner}</p>
                <p className="is-size-4 has-text-primary has-text-weight-bold">
                  {profileSalon[0].taxCode}
                </p>
                <p className="is-size-4">{profileSalon[0].phone}</p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeOpen}
                </p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeClose}
                </p>
                <p className="is-size-4">{profileSalon[0].district}</p>
                <p className="is-size-4">{profileSalon[0].city}</p>
                <p className="is-size-4">{profileSalon[0].detailAddress}</p>
                <p className="is-size-4 is-underlined">
                  {profileSalon[0].email}
                </p>
                <img
                  style={{
                    maxHeight: "300px",
                    maxWidth: "500px",
                    marginTop: "10px",
                  }}
                  src={
                    profileSalon[0].image
                      ? profileSalon[0].image
                      : imageUnavailable
                  }
                  alt="..."
                ></img>
              </div>
            </div>

            <div className="has-text-centered mb-5 mr-5">
              <button
                className="button is-info is-rounded"
                style={{ width: "200px" }}
                onClick={handleOpen}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
          }}
        >
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
                      Owner's name
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.nameOwner}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        nameOwner: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Email
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.email}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                {emailErr && (
                  <p className="text-danger">Your email is invalid!</p>
                )}
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
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      TaxCode
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.taxCode}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        taxCode: e.target.value,
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
                      <option key={district.toString()} value={district}>
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
                  <select className="custom-select" id="inputGroupSelect02">
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
              <div>
                {successMess && <p className="text-success">{successMess}</p>}
                {errMess && <p className="text-danger">{errMess}</p>}
                {emptyError && (
                  <p className="text-danger">Please enter all the fields</p>
                )}
              </div>

              <div className="has-text-right">
                <button
                  className="button is-rounded is-danger"
                  onClick={handleClose}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  className="button is-rounded is-primary ml-4"
                  onClick={handleEditBusinessInfo}
                >
                  {" "}
                  Edit
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/*  */}
    </div>
  ) : (
    <div></div>
  );
}
