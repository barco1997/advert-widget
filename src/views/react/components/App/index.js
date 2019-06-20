import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  }
  componentDidMount() {
    //https://api.eyezon.app/messages/dialogs?type=watcher
    let self = this;

    axios
      .get("https://api.eyezon.app/messages/dialogs?type=watcher")
      .then(function(response) {
        let answersCount = 0;
        response.data.dialogs.map(
          dialog => (answersCount = answersCount + dialog.answersCount)
        );

        let notificationCount = ls.get("notificationCount");
        console.log(answersCount);
        console.log(notificationCount);
        if (answersCount > notificationCount) {
          self.setState({
            notifications: answersCount - notificationCount,
            notificationStatus: true
          });
        }
        ls.set("notificationCount", answersCount);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setNotifications(val) {
    this.setState({
      notifications: val
    });
  }
  incrementNotifications() {
    console.log("Notifications: ");
    const val = this.state.notifications;
    this.setState({
      notifications: val + 1,
      notificationStatus: true
    });
  }
  render() {
    return (
      <React.Fragment>
        <Button
          color={this.props.color}
          businessId={this.props.businessId}
          ifOpened={this.props.ifOpened}
          button={this.props.button || this.state.notificationStatus}
          buttons={this.props.buttons}
          incrementNotifications={this.incrementNotifications}
          notifications={this.state.notifications}
          setNotifications={this.setNotifications}
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
