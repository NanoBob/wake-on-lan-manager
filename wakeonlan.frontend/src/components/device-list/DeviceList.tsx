import React from "react";
import { ApiService } from "../../services/ApiService";
import { DeviceDto } from "../../client/data-contracts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PasswordPopup } from "../password-popup/PasswordPopup";
import "./DeviceList.scss";
import { SelectedDevice } from "../selected-device/SelectedDevice";
import { CreateDevice } from "../create-device/CreateDevice";

type Props = {
  apiService: ApiService,
  selectedDevice: DeviceDto | null,
  select: (device: DeviceDto) => void
};
type State = {
  devices: DeviceDto[],
  popupVisible: boolean,
  isCreating: boolean
};

export class DeviceList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      devices: [],
      popupVisible: false,
      isCreating: false
    };
  }

  componentDidMount(): void {
    this.refreshDevices();
  }

  async deleteDevice(device: DeviceDto, password: string) {
    await this.props.apiService.deleteDevice(device, password);
    this.togglePopup();
    this.refreshDevices();
  }

  popupConfirm(password: string){
    if (this.props.selectedDevice)
      this.deleteDevice(this.props.selectedDevice, password);
  }

  togglePopup() {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  toggleCreate() {
    this.setState({
      isCreating: !this.state.isCreating
    });
  }

  selectDevice(device: DeviceDto) {
    this.props.select(device);
  }

  private async refreshDevices() {
    this.setState({
      devices: await this.props.apiService.getDevices()
    });
  }

  public render() {
    return <div className="device-list">
      <div className="device-list-header card-header">
        <div className="device-titlebar">
          <span className="device-titlebar-title">Devices</span>
          <span className="device-titlebar-button" onClick={this.toggleCreate.bind(this)}>+</span>
        </div>
        { this.state.isCreating ? 
          <CreateDevice apiService={this.props.apiService} created={this.refreshDevices.bind(this)}></CreateDevice>
        : <></>}
      </div>
      <div className="card-body">
        <div className="accordion">
          { this.state.devices.map(device => (
            <div key={device.id} className="accordion-item bg-dark">
              <div 
                className={`device ${(device === this.props.selectedDevice ? "selected" : "")}`} 
                key={device.id} onClick={x => this.selectDevice(device)}
              >
                <span className="device-name">{ device.name }</span>
                <div className="device-actions">
                  <span className="device-delete">
                    <FontAwesomeIcon 
                      onClick={this.togglePopup.bind(this)} 
                      icon={faTrash} 
                    />
                  </span>
                </div>
              </div>
                        
              { this.props.selectedDevice === device ? 
                <div className="accordion-collapse collapse-show bg-dark">
                  <SelectedDevice 
                    apiService={this.props.apiService} 
                    device={device}
                  ></SelectedDevice>
                </div>
              : <></>}
            </div>
          ))}
        </div>
      </div>
      { this.state.popupVisible ? 
        <PasswordPopup 
          action={this.popupConfirm.bind(this)} 
          close={this.togglePopup.bind(this)}
        ></PasswordPopup>
        : <></>}
    </div>;
  }
}
