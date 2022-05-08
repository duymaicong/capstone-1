import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalonList from "./SalonList.json";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import { convertISOStringToLocaleDateString } from "../../utils/index";

import { Modal, Box, Tooltip } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getListSalonActive,
  getListSalonDeactive,
  getListSalonRequest,
  resetListSalonActive,
  resetListSalonDeactive,
  resetListSalonRequest,
} from "../../redux/actions/creators/admin";

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  minHeight: "60rem",
};

export default function ManageService() {
  const fakeData = SalonList.data;

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // DISPATCH
  const dispatch = useDispatch();

  //STATE NAME SALON FOR FILTER
  const [nameSalonActive, setNameSalonActive] = useState("");
  const [nameSalonDeactive, setNameSalonDeactive] = useState("");
  const [nameSalonRequest, setNameSalonRequest] = useState("");

  //LOAD DATA FROM REDUX STORE
  //LOAD TOKEN FROM REDUX STORE
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  //LOAD LIST SALON ACTIVE
  const { listSalonActive } = useSelector((state) => state.litSalonActivated);
  //LOAD LIST SALON DEACTIVE
  const { listSalonDeactive } = useSelector((state) => state.listSalonDeactive);
  //LOAD LIST SALON REQUEST
  const { listSalonRequest } = useSelector((state) => state.listSalonRequest);

  //GET DATA FORM API
  //GET LIST SALON ACTIVE
  useEffect(() => {
    dispatch(getListSalonActive(token, { nameSalon: nameSalonActive }));
    return () => {
      dispatch(resetListSalonActive());
    };
  }, [dispatch, token, nameSalonActive]);

  //GET LIST SALON DEACTIVE
  useEffect(() => {
    dispatch(getListSalonDeactive(token, { nameSalon: nameSalonDeactive }));
    return () => {
      dispatch(resetListSalonDeactive());
    };
  }, [dispatch, token, nameSalonDeactive]);

  //GET LIST SALON REQUEST
  useEffect(() => {
    dispatch(getListSalonRequest(token, { nameSalon: nameSalonRequest }));
    return () => {
      dispatch(resetListSalonRequest);
    };
  }, [dispatch, token, nameSalonRequest]);

  return (
    <div>
      <div style={root}>
        <div className="columns">
          <div className="column is-2"></div>
          <div
            className="column is-8 mt-5 mb-5"
            style={{
              padding: "0px",
              minHeight: "400px",
              background: "url('" + paperbg + "')",
            }}
          >
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
                  <Tab label="Active Salons" value="1" />
                  <Tab label="Deactive Salons" value="2" />
                  <Tab label="Pending Request" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                      value={nameSalonActive}
                      onChange={(e) => {
                        setNameSalonActive(e.target.value);
                      }}
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>{" "}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Rating</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonActive?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonActive.indexOf(element) + 1}
                          </th>
                          <td>{element?.nameSalon}</td>
                          <td>{element?.detailAddress}</td>
                          <td>
                            {convertISOStringToLocaleDateString(
                              element?.joinDate
                            )}
                          </td>
                          <td>{element?.star}</td>

                          <td className="has-text-centered">
                            <Link
                              to="/DetailSalon"
                              className="button is-rounded is-info mr-5"
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-warning has-text-white">
                              <i className="fa-solid fa-stop"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  {" "}
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                      value={nameSalonDeactive}
                      onChange={(e) => {
                        setNameSalonDeactive(e.target.value);
                      }}
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Rating</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonDeactive?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonDeactive.indexOf(element) + 1}
                          </th>
                          <td>{element.nameSalon}</td>
                          <td>{element.detailAddress}</td>
                          <td>{element.dateJoin}</td>
                          <td>{element.AverangeVote}</td>

                          <td className="has-text-centered">
                            <Link
                              to="/DetailSalon"
                              className="button is-rounded is-info mr-5"
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-primary has-text-white">
                              <i className="fa-solid fa-play"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  {" "}
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                      value={nameSalonRequest}
                      onChange={(e) => {
                        setNameSalonRequest(e.target.value);
                      }}
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Email</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonRequest?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonRequest.indexOf(element) + 1}
                          </th>
                          <td>{element.nameSalon}</td>
                          <td>{element.detailAddress}</td>
                          <td>
                            {convertISOStringToLocaleDateString(
                              element.requestDate
                            )}
                          </td>
                          <td>{element.email}</td>

                          <td className="has-text-centered">
                            <Link
                              to="/RequestForm"
                              className="button is-rounded is-info mr-5"
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-success mr-5 has-text-white">
                              <i className="fa-solid fa-check"></i>
                            </button>
                            <button className="button is-rounded is-danger has-text-white">
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabContext>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
    </div>
  );
}
