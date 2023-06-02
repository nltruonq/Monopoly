import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = (props) => {

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return <NavLink {...props} onClick={handleClick} />;
};

export default CustomNavLink;