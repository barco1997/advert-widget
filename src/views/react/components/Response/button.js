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
  text-decoration: none;

  border-radius: 100px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;

  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: #ff2d55;
  font-family: "Mont";
  font-size: 13px;
  width: 70px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.45);
  }
`;

const ControlButton = ({ children, action }) => (
  <Button onClick={action}>
    <div style={{ paddingTop: "4px" }}>{children}</div>
  </Button>
);

ControlButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.func
};

export default ControlButton;
