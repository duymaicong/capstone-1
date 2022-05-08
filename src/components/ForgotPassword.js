import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../validations/regex";
import { forgotPassword } from "../redux/actions/creators/auth/index";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPassword() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const { recoveredAccount, errMess, successMessage } = useSelector(
    (state) => state.recoverAccount
  );
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const resetForm = () => {
    setUserName("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailErr(false);
    setError(false);

    const accountForgotten = {
      account_name: username,
      email: email,
    };
    let pass = true;
    if (username === "" || email === "") {
      setError(true);
      pass = false;
      return;
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      pass = false;
    }
    if (pass) {
      const callBack =()=>{
        navigate("/")
      }
      dispatch(forgotPassword(accountForgotten,callBack));
      console.log(accountForgotten);
    }
  };
  useEffect(() => {
    if (successMessage) {
      resetForm();
      
    }
  }, [successMessage]);

  const btnSubmit = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    marginTop: "2rem",
    width: "30%",
    height: "2.6rem",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
    fontSize: "1.3rem",
  };
  return (
    <div>
      <div className="container register-form pt-5 ">
        <section className=" bg-image ">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div
                    className="bg-transparent"
                    style={{ borderRadius: "15px", border: "none" }}
                  >
                    <div className="card-body p-5">
                      <h2 className="text-center mb-5"style={{fontSize:"2rem",fontWeight:"bold"}}>
                        Recover your account
                      </h2>
                      
                      <form>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Username
                              </span>
                            </div>
                            <input
                              value={username}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleUserName}
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
                              value={email}
                              type="email"
                              className="form-control"
                              maxLength={40}
                              onChange={handleEmail}
                            />
                          </div>
                          {emailErr && (
                            <p className="text-danger">
                              Your email is invalid!
                            </p>
                          )}
                        </div>

                        <div className="messages">
                          {error && (
                            <div className="error">
                              <p className="text-danger">
                                Please enter all the fields
                              </p>
                            </div>
                          )}
                          {errMess && (
                            <div className="error">
                              <p className="text-danger">{errMess}</p>
                            </div>
                          )}
                          {successMessage && (
                            <div className="success">
                              <p className="text-success">New password has been sent to your email</p>
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            style={btnSubmit}
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Have already an account?{" "}
                          <Link to="/login" className="fw-bold text-body">
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
