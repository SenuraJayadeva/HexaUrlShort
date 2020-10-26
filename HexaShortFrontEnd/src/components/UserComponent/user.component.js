import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GenerateRandomUrl from "../GenerateRandomURL/generaterandom.component";
import Redirect from "../RedirectComponent/redirect.component";
import GenerateCustomUrl from "../GenerateCustomUrl/generatecustom.component";

import Logo from "./img/logo.jpg";

export default function UserComponent() {
  const [userName, setuserName] = useState(null);
  const [picture, setpicture] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    console.log(config);

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/auth", config)
      .then((res) => {
        console.log(res);
        setuserName(res.data.name);
        setpicture(res.data.picture);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

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
        </nav>

        <div>
          <div className="row">
            <div className="col-md-4">
              {" "}
              <div className="container">
                <div className="row">
                  <center>
                    <div className="col-md-6">
                      <img src={Logo} style={{ width: "250px" }} alt="logo" />
                    </div>
                    <div className="col-md-6 text-center">
                      <h1>HexaShort</h1>
                      <p>
                        Free URL shortener to create the perfect short URLs for
                        your business. HexaShort helps you shorten, create and
                        share branded links with custom domains at scale.
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
            </div>
            <div className="col-md-8">
              <div className="row" style={{ marginTop: "10%" }}>
                <div className="container">
                  {" "}
                  <div className="col-md-12">
                    <h3 className="text-center">Generate Random URL</h3>
                    <hr />
                    <GenerateRandomUrl />
                  </div>
                  <div className="col-md-12">
                    <h3 className="text-center">Generate Customized URL</h3>
                    <hr />
                    <GenerateCustomUrl />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}
