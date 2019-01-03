import styled from "styled-components";
import React from "react";
import { format } from "date-fns";
import logo from "./logo.png";

const Response = ({ title, description, date, icon }) => {
  const Item = styled.li`
    display: flex;
    width: 100%;
    margin: 5px 0;
    padding: 10px 0px;
    border-radius: 5px;
    justify-content: flex-start;
    min-height: 41px;
    overflow: hidden;
    flex-wrap: wrap;
  `;

  const Icon = styled.div`
    width: 40px;
    height: 40px;

    margin-right: 20px;
    background: white;

    & > img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  `;

  const ItemStart = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: center;
  `;

  const ItemEnd = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `;

  const Title = styled.h4`
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  `;

  const Summary = styled.p`
    margin: 0;
    font-size: 12px;
    opacity: 0.5;
    margin-top: 6px;
  `;

  const Date = styled.time`
    opacity: 0.2;
    margin-right: 0px;
    font-size: 12px;
  `;

  return (
    <div style={{ display: "block" }}>
      <Item>
        <Icon>
          <img src={icon || logo} alt="item type" />
        </Icon>
        <ItemStart>
          <Title>{title}</Title>
          {description && <Summary>{description}</Summary>}
        </ItemStart>
        <ItemEnd>
          <Date>{format(date, "h:m")}</Date>
        </ItemEnd>
      </Item>
    </div>
  );
};

export default Response;
