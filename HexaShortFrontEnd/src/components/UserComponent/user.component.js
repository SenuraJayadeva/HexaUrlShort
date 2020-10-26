import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <p>hai</p>
    </div>
  );
}
