import React from "react";
import image from "../svgs/spinner.svg";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <img src={image} alt="Spinner" />
      </div>
    </>
  );
};

export default Spinner;
