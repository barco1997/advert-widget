import React from "react";
//import PropTypes from "prop-types";
//import styled from "styled-components";
import axios from "axios";
import ls from "local-storage";
import Button from "../Button";

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notifications: 0,
      notificationStatus: false
    };
    this.setNotifications = this.setNotifications.bind(this);
    this.incrementNotifications = this.incrementNotifications.bind(this);
    this.decrementNotifications = this.decrementNotifications.bind(this);
  }
  componentDidMount() {
    //get amount of notifications

    let self = this;
    const buttonId = this.props.buttonId;
    const userId = ls.get("userId");
    /*if (userId) {
      url = `https://eyezon.herokuapp.com/api/button/${buttonId}/unreaded/${userId}`;
      axios
        .get(url)
        .then(function(response) {
          //let notificationCount = ls.get("notificationCount");
          console.log(response);
          //console.log(notificationCount);
          /*if (response.answers > 0) {
          self.setState({
            notifications: response.answers,
            notificationStatus: true
          });
        }
        })
        .catch(function(error) {
          console.log(error);
        });
}*/
  }

  setNotifications(val) {
    console.log("Set method happened", val);
    //let obj;
    if (val > 0) {
      this.setState({
        notifications: val,
        notificationStatus: true
      });
    } else {
      this.setState({
        notifications: val
      });
    }
  }
  incrementNotifications() {
    console.log("Notifications: ");
    const val = this.state.notifications;
    this.setState({
      notifications: val + 1,
      notificationStatus: true
    });
  }
  decrementNotifications() {
    console.log("Notifications: ");
    const val = this.state.notifications > 0 ? this.state.notifications : 1;
    this.setState({
      notifications: val - 1
    });
  }
  render() {
    //console.log("BUSINESS, ", this.props.businessId);
    return (
      <React.Fragment>
        <Button
          color={this.props.color}
          businessId={this.props.businessId}
          buttonId={this.props.buttonId}
          ifOpened={this.props.ifOpened}
          button={this.props.button || this.state.notificationStatus}
          buttons={this.props.buttons}
          incrementNotifications={this.incrementNotifications}
          notifications={this.state.notifications}
          setNotifications={this.setNotifications}
          decrementNotifications={this.decrementNotifications}
        />
      </React.Fragment>
    );
  }
}

//export default Button;

/*const App = ({ color, button, businessId, ifOpened, buttons }) => {
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
};*/
export default App;
