import React, { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import { GoogleLogin } from "react-google-login";

import Logo from "./img/logo.jpg";

export default function Mainpage() {
  const [longUrl, setlongUrl] = useState();
  const [urlCode, seturlCode] = useState();
  const [shortUrl, setShortUrl] = useState();

  //COPY TEXT
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard(e) {
    copy(shortUrl);
    setCopySuccess("Copied!");
  }

  function onFormSubmit(e) {
    setCopySuccess("");
    setShortUrl("Generating......");

    e.preventDefault();

    const newUrl = {
      longUrl,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/url/shorten", newUrl)
      .then((res) => {
        console.log(res);
        seturlCode(res.data.urlCode);
        setShortUrl("hexashort.tk/" + res.data.urlCode);
      })
      .catch(() => {
        setShortUrl("Please Try Again......");
      });
  }

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: process.env.REACT_APP_BACKEND_URL + "/api/auth/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((res) => {
      alert("Login Success");
      localStorage.setItem("x-auth-token", res.data.token);
      window.location = "/me";
    });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <nav class="navbar navbar-light bg-dark justify-content-between">
        <a class="navbar-brand">Navbar</a>

        <GoogleLogin
          clientId="832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </nav>
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
                business. HexaShort helps you shorten, create and share branded
                links with custom domains at scale.
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
      <divv className="container">
        <center>
          <div style={{ margin: "auto" }}>
            <form onSubmit={onFormSubmit}>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Url"
                  onChange={(e) => {
                    setlongUrl(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <button type="submit" class="btn btn-primary">
                  GET SHORTEN LINK
                </button>
              </div>
            </form>
          </div>
        </center>
      </divv>

      <div className="container">
        <center>
          <p
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              axios
                .get(process.env.REACT_APP_BACKEND_URL + "/" + urlCode)
                .then((res) => {
                  console.log(res);
                  window.open(
                    res.data,
                    "_blank" // <- This is what makes it open in a new window.
                  );
                });
            }}
          >
            {shortUrl}
          </p>

          <div style={{ marginBottom: "10px" }}>
            {!shortUrl ? (
              " "
            ) : (
              <button onClick={copyToClipboard}>Copy Url</button>
            )}
            &nbsp; &nbsp;
            {copySuccess}
          </div>
        </center>
      </div>
    </div>
  );
}
