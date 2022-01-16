import React from "react";
import { ApiService } from "./services/ApiService";
import { DeviceList } from "./components/device-list/DeviceList";
import "./Imports.scss";
import "./App.scss";
import { DeviceDto } from "./client/data-contracts";
import { NotificationService } from "./services/NotificationService";
import { Notifications } from "./components/notifications/Notifications";

type Props = {};
type State = {
  apiService: ApiService,
  notificationService: NotificationService,
  selectedDevice: DeviceDto | null,
};

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const notificationService = new NotificationService();
    this.state = {
      apiService: new ApiService(notificationService),
      notificationService: notificationService,
      selectedDevice: null
    };
  }

  selectDevice(device: DeviceDto){
    this.setState({
      selectedDevice: device
    })
  }

  public render() {
    return <div className="app">
      <div className="center card bg-dark">
        <DeviceList 
          apiService={this.state.apiService} 
          select={this.selectDevice.bind(this)}
          selectedDevice={this.state.selectedDevice}
        ></DeviceList>
      </div>
      <Notifications 
        notificationService={this.state.notificationService}
      ></Notifications>
    </div>;
  }
}
