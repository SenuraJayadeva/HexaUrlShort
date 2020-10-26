import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { GoogleLogin } from "react-google-login";

import Logo from "./img/logo.jpg";
//import components
import GenerateRandomUrl from "../GenerateRandomURL/generaterandom.component";
import Redirect from "../RedirectComponent/redirect.component";
import GenerateCustomUrl from "../GenerateCustomUrl/generatecustom.component";

export default function Mainpage() {
  const [userName, setuserName] = useState(null);
  const [picture, setpicture] = useState(null);

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: process.env.REACT_APP_BACKEND_URL + "/api/auth/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((res) => {
      alert("Login Success");
      localStorage.setItem("x-auth-token", res.data.token);

      const config = {
        headers: {
          "x-auth-token": res.data.token,
        },
      };

      console.log(config);

      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/auth", config)
        .then((res) => {
          console.log(res);
          setuserName(res.data.name);
          setpicture(res.data.picture);
          window.location = "/me";
        })
        .catch((err) => {
          alert(err);
        });
    });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  function userLogout() {
    localStorage.removeItem("x-auth-token");
    setuserName(null);
    setpicture(null);
    window.location = "/";
  }

  return (
    <Router>
      <div>
        <nav class="navbar navbar-light bg-light justify-content-between">
          <a class="navbar-brand">HexaShort</a>

          {userName !== null ? (
            <>
              <a>
                <img
                  src={picture}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                {"  "}
                {userName}
                {"  "}
                <button className="btn btn-outline-danger" onClick={userLogout}>
                  Logout
                </button>
              </a>
            </>
          ) : (
            <GoogleLogin
              clientId="832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </nav>

        <div>
          <div className="container">
            <div className="row">
              <center>
                <div className="col-md-6">
                  <img src={Logo} style={{ width: "250px" }} alt="logo" />
                </div>
                <div className="col-md-6 text-center">
                  <h1>HexaShort</h1>
                  <p>
                    Free URL shortener to create the perfect short URLs for your
                    business. HexaShort helps you shorten, create and share
                    branded links with custom domains at scale.
                  </p>
                  <p>
                    <span style={{ fontSize: "10px" }}>
                      By Senura Vihan Jayadeva
                    </span>
                  </p>
                </div>
              </center>
            </div>
          </div>
          <GenerateRandomUrl />
          {/* <Route path="/me" exact component={GenerateCustomUrl} /> */}
          <Route path="/:id" exact component={Redirect} />
        </div>
      </div>
    </Router>
  );
}
