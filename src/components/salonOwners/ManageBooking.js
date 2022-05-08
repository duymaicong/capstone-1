import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { currencyFormatter } from "../../utils";

import {
  getListServiceForSalon,
  resetListServiceOfSalon,
} from "../../redux/actions/creators/salon";
import { FormControl, RadioGroup,FormControlLabel,Radio } from "@mui/material";
import moment from "moment";
import introbg from "../../assets/introbg-1.jpg";
import videobg from "../../assets/videobg.jpg";
import patterbg from "../../assets/patterbg.svg";
import imageUnavailable from "../../assets/image-unavailable.png";

export default function Staff() {
  const minDate = new Date(
    moment().add(4, "hours").add(15, "minutes").startOf("day")
  ); // If the current time is after 7:45pm, the min date will be the next day

  const [date, setDate] = useState(minDate);
  const [staff, setStaff] = useState("");
  const [time, setTime] = useState(undefined);
  const [dateFormated, setDateFormated] = useState(convertDate(minDate));
  const [staffInfo, setStaffInfo] = useState();
  const { serviceId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { staffList } = useSelector((state) => state.staff);
  const { selectedSalonId, selectedServiceId, priceOriginal, serviceTime } =
    useSelector((state) => state.booking);
  const { calendar } = useSelector((state) => state.staffCalendar);

  useEffect(() => {
    if (staff && dateFormated) {
      setTime(undefined);
      setStaffInfo({
        staffId: staff,
        day: dateFormated,
        service_time: serviceTime,
      });
    }
  }, [staff, dateFormated, serviceTime]);

  // GET SERVICE
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

  //

  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  const handleInputDate = (date) => {
    setDate(date);
    setDateFormated(convertDate(date));
  };

  const handleSubmit = () => {
    const bookingInfo = {
      salonId: selectedSalonId,
      serviceId: selectedServiceId,
      staffId: staff,
      timeUse: `${dateFormated} ${time}:00`,
      price_original: parseInt(priceOriginal),
      service_time: serviceTime,
    };

    const callback = () => {
      navigate("/finish_booking");
    };
  };
  const root = {
    minHeight: "60rem",
    backgroundImage: `url(${introbg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const cancelBook = `/`;

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-1"></div>
        <div className="column is-10">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
            >
              <div className="rows">
              {listService?.map((service) => (
                <div
                  className="card mb-3 mt-3 col-6"
                  style={{
                    display: "inline-block",
                    marginRight: "2%",
                    width: "48%",
                    backgroundColor: " #F5F3ED",
                    height: "12rem",
                    borderRadius: "25px",
                  }}
                  key={service.serviceId}
                >
                  <div className="columns">
                    {/* <div className="column is-4">
                      <img
                        src={service.image ? service.image : imageUnavailable}
                        alt="..."
                        style={{
                          height: "100%",
                          width: "100%  ",
                          maxHeight: "12rem",
                          borderRadius: "25px",
                        }}
                      />
                    </div> */}
                    <div className="column is-1">
                    <FormControlLabel
                        value={service.serviceId}
                        control={<Radio />}
                        label=""
                      />
                    </div>
                    <div className="column is-11 has-text-left">
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
                            {currencyFormatter.format(service.price)}{" "}
                          </p>
                        )}

                        {service.promotion !== 0 && (
                          <p className="has-text-grey-light has-text-weight-semibold">
                            <del>
                              {" "}
                              {currencyFormatter.format(service.price)}{" "}
                            </del>

                            <span className="has-text-danger-dark has-text-weight-semibold">
                              {" "}
                              {currencyFormatter.format(
                                service.price -
                                  (service.price / 100) * service.promotion
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
                   
                  </div>
                </div>
              ))}</div>
            </RadioGroup>
          </FormControl>
          <div
            className="mb-5 pt-5"
            style={{
              background: "url(" + patterbg + ")",
              boxShadow: "1px 1px 20px black",
            }}
          >
            <div class="steps" id="stepsDemo">
              <div class="step-item is-completed is-link">
                <div class="step-marker">1</div>
                <div class="step-details">
                  <p class="step-title">Choose date</p>
                  <br></br>
                  <Calendar
                    className="rounded"
                    onChange={handleInputDate}
                    value={date}
                    minDate={minDate}
                  />
                  {/* { console.log(staffInfo)}
                   {console.log(staff,dateFormated)}
                   {console.log(calendar)}  */}
                </div>
              </div>
              <div class="step-item  is-completed is-link">
                <div class="step-marker">2</div>
                <div class="step-details">
                  <p class="step-title">Choose staff</p>
                  <br></br>
                  <select
                    className="form-select form-select-lg mb-3 "
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    style={{
                      width: "95%",
                      height: "2.5rem",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <option defaultValue={""}>Choose a staff...</option>
                    {staffList?.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="step-item is-completed is-link">
                <div class="step-marker">3</div>
                <div class="step-details">
                  <p class="step-title">Choose slot</p>
                  <br></br>
                  <div className="form-check">
                    {calendar?.calendar.map((slot) => (
                      <div
                        className="form-check form-check-inline mr-4"
                        key={slot.toString()}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <input
                          type="radio"
                          name="inlineRadioOptions"
                          value={slot}
                          className="rounded mr-1 mb-2 bg-white"
                        ></input>
                        <label>{slot}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div class="step-item is-completed is-link">
                <div class="step-marker">4</div>
                <div class="step-details">
                  <p class="step-title">Note</p>
                  <br></br>
                  <textarea
                    placeholder="Customer's name / phone number"
                    rows="10"
                    cols="35"
                    maxlength="450"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-md-12 text-center pb-5 ">
              <Link
                style={{ width: "40%" }}
                className="button is-rounded is-danger mr-3 has-text-weight-semibold"
                to={cancelBook}
              >
                Cancel
              </Link>
              <button
                style={{ width: "40%" }}
                className="button is-rounded is-info ml-3 has-text-weight-semibold"
                onClick={handleSubmit}
                disabled={!staff || !time || !dateFormated}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="column is-1"></div>
      </div>
    </div>
  );
}
