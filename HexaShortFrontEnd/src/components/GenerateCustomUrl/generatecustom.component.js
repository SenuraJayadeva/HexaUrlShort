import React, { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";

import Logo from "./img/logo.jpg";

export default function GenerateCustomUrl() {
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

  return (
    <div>
      <div className="container">
        <div className="row">
          <center>
            <div className="col-md-6">
              <img src={Logo} style={{ width: "250px" }} alt="logo" />
            </div>
            <div className="col-md-6 text-center">
              <h1>HexaShort | Custom Url</h1>
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
      <div className="container">
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
      </div>

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
