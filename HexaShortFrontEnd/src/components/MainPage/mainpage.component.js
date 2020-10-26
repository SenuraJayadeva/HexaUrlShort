import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { GoogleLogin } from "react-google-login";

//import components
import GenerateRandomUrl from "../GenerateRandomURL/generaterandom.component";
import Redirect from "../RedirectComponent/redirect.component";
import GenerateCustomUrl from "../GenerateCustomUrl/generatecustom.component";

export default function Mainpage() {
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
    <Router>
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

        <div>
          <Route path="/" exact component={GenerateRandomUrl} />
          <Route path="/me" exact component={GenerateCustomUrl} />
          <Route path="/:id" exact component={Redirect} />
        </div>
      </div>
    </Router>
  );
}
