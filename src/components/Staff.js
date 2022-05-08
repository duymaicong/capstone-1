import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import {
  getStaffList,
  resetStaffList,
  getServiceList,
  resetServiceList,
  getStaffCalendar,
  resetStaffCalender,
  bookService,
} from "../redux/actions/creators/booking";
import moment from "moment";
import introbg from "../assets/introbg-1.jpg";
import videobg from "../assets/videobg.jpg";
import patterbg from "../assets/patterbg.svg";

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
  const { serviceList } = useSelector((state) => state.service);
  const { selectedSalonId, selectedServiceId, priceOriginal, serviceTime } =
    useSelector((state) => state.booking);
  const { calendar } = useSelector((state) => state.staffCalendar);
  const { token } = useSelector((state) => state.loginAccount.account);

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

  useEffect(() => {
    dispatch(getServiceList(serviceId));

    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(getStaffList(serviceId));

    return () => {
      dispatch(resetStaffList());
    };
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (staffInfo) {
      dispatch(getStaffCalendar(staffInfo));
    }
    return () => {
      dispatch(resetStaffCalender());
    };
  }, [dispatch, staffInfo]);

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

    dispatch(bookService(bookingInfo, token, callback));
  };
  const root = {
    backgroundImage: `url(${introbg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const cancelBook = `/services/${selectedSalonId}`;

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-8">
          <div
            className="mt-5 mb-5"
            style={{
              background: "url(" + patterbg + ")",
              boxShadow: "1px 1px 20px black",
            }}
          >
            <div className="">
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className="text-center"
                  style={{ background: "url(" + videobg + ")" }}
                  key={salon.salonId}
                >
                  <div className="pb-2 mb-3">
                    <h2 className="is-size-2 has-text-link has-text-weight-semibold">
                      {salon.nameSalon}
                    </h2>
                    <p className="is-size-4" style={{ color: "white" }}>
                      Open:{" "}
                      <span className="text-danger">
                        Mon-Sun {salon.timeOpen} -{" "}
                        {salon.timeClose}
                      </span>
                    </p>
                    <p className="is-size-4 " style={{ color: "white" }}>
                      <span>
                        Phone number:{" "}
                        <span className="has-text-weight-thin">
                          {" "}
                          <span className="has-text-info is-underlined">
                            {salon.phone}
                          </span>
                        </span>
                      </span>
                    </p>
                    <p className="is-size-4" style={{ color: "white" }}>
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      <span className="is-size-4 has-text-primary">
                        {salon.detailAddress}
                      </span>
                    </p>
                  </div>
                  <br></br>
                  <p className="has-text-danger"> {selectedServiceId}</p>
                </div>
              ))}
            </div>
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

        <div className="column is-2"></div>
      </div>
    </div>
  );
}
