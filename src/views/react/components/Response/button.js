/**
 *
 * SendButton
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { NavHashLink as NavLink } from "react-router-hash-link";

const Button = styled.div`
  text-decoration: none !important;

  border-radius: 100px !important;
  -webkit-font-smoothing: antialiased !important;
  -webkit-touch-callout: none !important;
  user-select: none !important;
  cursor: pointer !important;

  height: 21px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: white !important;
  color: #ff2d55 !important;
  font-family: "Mont" !important;
  font-size: 13px !important;
  width: 70px !important;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25) !important;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.45) !important;
  }
`;

const ControlButton = ({ children, action }) => (
  <Button onClick={action}>
    <div style={{ paddingTop: "4px !important" }}>{children}</div>
  </Button>
);

/*ControlButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.func
};*/

export default ControlButton;
