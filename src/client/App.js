import React, { useState, useEffect } from "react";
import "./app.css";
import ReactImage from "./react.png";

export default function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log("Coming in userName Effect.. ");
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => setUserName(user.username));

  }, [userName]);

  return (
    <>
      <div>
        {userName ? (
          <h1>{`Hello ${userName}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        <img src={ReactImage} alt="react" />
      </div>
    </>
  );
}
