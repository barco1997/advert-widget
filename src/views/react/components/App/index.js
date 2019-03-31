import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button";
import ButtonConnector from "../ButtonConnector";

const App = ({ color, button, target, businessId, ifOpened }) => {
  return (
    <React.Fragment>
      {button && (
        <Button color={color} businessId={businessId} ifOpened={ifOpened} />
      )}
      {!button && (
        <ButtonConnector
          target={target}
          businessId={businessId}
          ifOpened={ifOpened}
        />
      )}
    </React.Fragment>
  );
};
export default App;
