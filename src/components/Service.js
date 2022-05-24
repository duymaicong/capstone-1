import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import {
  getServiceList,
  resetServiceList,
  updateSelectedService,
} from "../redux/actions/creators/booking";
import {
  getReviewOfSalon,
  getVoteOfSalon,
  resetReviewOfSalon,
  resetVoteOfSalon,
  addFeedBack,
} from "../redux/actions/creators/customer";

import {
  convertISOStringToLocaleTimeString,
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../utils";
import bgImg from "../assets/barbershopbg.jpg";
import paperbg from "../assets/paperbg.jpg";
import imageUnavailable from "../assets/image-unavailable.png";
import fakeReviews from "../components/mockUp/review.json";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";

// CSS
const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  minHeight: "40rem",
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

export default function Service() {
  // FAKE DATA
  // const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;

    // search review by star
    const [starSearch, setStar] = useState("");

      // -- RATING --
  const [valueRating, setValueRating] = React.useState(2);

  //create state for create feedback by customer
  const [star, setSta] = useState(1);
  const [content, setContent] = useState("");

    const handleGetReviewByStar = (e) => {
      e.preventDefault();
      var star=e.target.value;

      console.log(star)
      dispatch(getReviewOfSalon({salonId:salonId, star:star}));
     
    };

  // API DATA
  const [type, setType] = useState("Services");
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  console.log(type);
  const { serviceList } = useSelector((state) => state.service);
  const { salonId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceList(salonId));
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, salonId]);



  // -- Get vote of salon
  const { voteOfSalon } = useSelector((state) => state.voteOfSalon);

  useEffect(() => {
    dispatch(getVoteOfSalon({salonId:salonId}));
  }, [dispatch, salonId]);

  // -- Get review of salon
  const { reviewOfSalon } = useSelector((state) => state.reviewOfSalon);

  useEffect(() => {
    dispatch(getReviewOfSalon({salonId:salonId,star:starSearch}));
    
  }, [dispatch, salonId]);
  //create state for error
  const [error, setError] = useState(false);

  //reset form
  const resetAddFeedback = () => {
    setSta(1);
    setContent("");
  };

  // -- add comment
  const handleAddReview = (e) =>{
    e.preventDefault();
    setError(false);
    let pass = true;
    if (
      content === ""
    ) {
      setError(true);
      pass = false;
      return;
    }
   const infor={
      rate:star*2,
      content:content,
      salonId:salonId,

    }
    if (pass) {
      console.log(infor);
      resetAddFeedback();
      const successCallback = () => {
        console.log("success callback");
        setStar("")
        dispatch(resetVoteOfSalon());
        dispatch(resetReviewOfSalon());
        handleCloseReview();
        dispatch(getReviewOfSalon({salonId:salonId,star:starSearch}));
        dispatch(getVoteOfSalon({salonId:salonId}))
      };
      dispatch(addFeedBack(token, infor, successCallback));
    }
  };

  

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // -- MODAL REVIEW --
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);
  return (
    <div style={root}>
      {/* -- VERTICAL STYLE -- */}

      <div className="columns">
        <div className="column is-3"></div>
        <div
          className="column is-6 mt-3 p-0"
          style={{
            boxShadow: "1px 1px 20px black",
          }}
        >
          <div
            className="p-0"
            style={{ backgroundImage: "url(" + paperbg + ")" }}
          >
            <div>
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className=""
                  // style={{ background: "url(" + patterbg + ")" }}
                  key={salon.salonId}
                >
                  <div className="columns mt-0 pt-0">
                    <div className="column is-6" style={{ paddingTop: "0px" }}>
                      <img
                        style={{ height: "100%", width: "auto" }}
                        src={salon.image}
                        alt="..."
                      />
                    </div>
                    <div className="column is-6 pt-5">
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
                            Mon-Sun {salon.timeOpen} -{" "}
                            {salon.timeClose}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundImage: "url(" + paperbg + ")",
                minHeight: "35rem",
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
                    <Tab
                      className="font-weight-bold"
                      label="Services"
                      value="1"
                    />
                    <Tab
                      className="font-weight-bold"
                      label="Review"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1" style={{ marginBottom: "1.5rem" }}>
                  <div>
                    {serviceList?.data?.map((service) => (
                      <div
                        className="card mb-3"
                        style={{
                          background: "url(" + paperbg + ")",
                          height: "12rem",
                          borderRadius: "25px",
                        }}
                        key={service.serviceId}
                      >
                        <div className="columns">
                          <div className="column is-3">
                            <img
                              src={
                                service.image ? service.image : imageUnavailable
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
                              <h4 className="has-text-info-dark is-size-4 has-text-weight-bold">
                                {service.name} -{" "}
                                <span className="has-text-link-dark is-size-5">
                                  {service.content}
                                </span>
                              </h4>

                              <p className="is-size-5 has-text-dark">
                                {service.service_time} minutes
                              </p>
                              {service.promotion === 0 && (
                                <p className="has-text-danger has-text-weight-semibold">
                                  {" "}
                                  {currencyFormatter.format(service.price)}{" "}
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
                                    {"-> "}
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
                              <p className="">{service.description}</p>
                            </div>
                          </div>
                          <div className="column is-2 mt-3 has-text-right">
                            <Link
                              to={`/staff/${service.salonId}`}
                              style={{ width: "100px" }}
                              className="button mr-3 is-info is-rounded font-weight-bold"
                              onClick={() =>
                                dispatch(updateSelectedService(service))
                              }
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div>
                    <div className="has-text-right w-100 pr-5">
                      <button
                        className="button is-info is-rounded"
                        onClick={handleOpenReview}
                      >
                        Write review
                      </button>
                    </div>
                    <div className=" columns,mx-auto mb-4">
                     
                          <div className="column is-9 has-text-left mt-3">
                          {voteOfSalon?.map((vote) => (
                            <p className="has-text-info">

                              {" "}

                              <span className="is-size-4 has-text-weight-semibold">
                                {(vote.AverangeVote).toFixed(1)}
                              </span>
                              <Rating
                                name="half-rating-read"
                                value={vote.AverangeVote}
                                precision={0.1}
                                readOnly
                              />
                              
                              <br></br>
                              out of 5<br></br>
                              {vote.TotalVote} reviews
                            </p>
                          ))}

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
                         {review.salonId}
                         {review.nameCustomer}
                           - {review.wsend}
                         </h1>
                         <p className="ml-3 is-size-5"> 
                         {review.rate/2}
                         <Rating
                                name="half-rating-read"
                                value={review.rate/2}
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
                  {/* Modal review */}
                  <Modal
                    open={openReview}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={modalcss}>
                      <div>
                        <form action="" method="post" className="writeReview">
                          <fieldset>
                            <div
                              className="has-text-right"
                              style={{ marginRight: "100px" }}
                            >
                              <br></br>
                              <label className="mt-5" for="vote">
                                rate the salon:
                              </label>
                              <Rating
                                name="half-rating-read"
                                onClick={(event) => {
                                  setSta(event.target.value);
                                }}
                              />
                              {" "}
                              <br></br>
                              <label className="mt-5" for="content">
                                Write your review:
                              </label>
                              <textarea
                                id="content"
                                style={{ resize: "none" }}
                                className=" mt-5 w-50 ml-5"
                                placeholder="Text input"
                                rows="5"
                                value={content}
                                onChange={(event) => {
                                  setContent(event.target.value);
                                }}
                              />{" "}
                              <br></br>
                            </div>{" "}
                            <br></br>
                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-danger"
                                onClick={handleCloseReview}
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                className="button is-rounded is-info ml-5"
                                onClick={handleAddReview}
                              >
                                {" "}
                                Add
                              </button>
                              
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </Box>
                  </Modal>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </div>
  );
}
