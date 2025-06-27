import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      className={`card ${className} ${onClick ? "card-clickable" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
