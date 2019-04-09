import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button";
import ButtonConnector from "../ButtonConnector";

const App = ({ color, button, businessId, ifOpened, buttons }) => {
  return (
    <React.Fragment>
      <Button
        color={color}
        businessId={businessId}
        ifOpened={ifOpened}
        button={button}
        buttons={buttons}
      />
    </React.Fragment>
  );
};
export default App;
