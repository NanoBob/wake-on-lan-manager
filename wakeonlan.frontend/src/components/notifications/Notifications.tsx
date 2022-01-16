import React from "react";
import "./Notifications.scss";
import { NotificationService, Notification } from "../../services/NotificationService";

type Props = {
  notificationService: NotificationService
};
type State = {
  notifications: Notification[]
};

export class Notifications extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    this.props.notificationService.registerCallback(this.setNotifications.bind(this))
  }

  setNotifications(notifications: Notification[]) {
    this.setState({
      notifications: notifications
    })
  }

  public render() {
    return <div className="notifications">
      <div className="notification-container">
        { this.state.notifications.map((notification, i) => (
          <div className="notification" key={i}>
            <div className={`alert alert-${notification.type}`}>
              {notification.text}
            </div>
          </div>
        ))}
      </div>
    </div>;
  }
}
