import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>
        Oops! the page youre looking for doesn't exists.please click the home
        link to navigate back to the home page{" "}
      </p>
      <Link to="/"></Link>
    </>
  );
}

export default NotFound;
