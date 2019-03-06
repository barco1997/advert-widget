import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button";
import ButtonConnector from "../ButtonConnector";

const App = ({ color, button, target, businessId }) => {
  return (
    <React.Fragment>
      {button && <Button color={color} businessId={businessId} />}
      {!button && <ButtonConnector target={target} businessId={businessId} />}
    </React.Fragment>
  );
};
export default App;
