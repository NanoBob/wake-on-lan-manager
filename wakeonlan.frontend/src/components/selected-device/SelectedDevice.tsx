import React from "react";
import { ApiService } from "../../services/ApiService";
import { DeviceDto } from "../../client/data-contracts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { PasswordPopup } from "../password-popup/PasswordPopup";
import "./SelectedDevice.scss";

type Props = {
  apiService: ApiService,
  device: DeviceDto
};
type State = {
  popupVisible: boolean,
  isDeviceOn: boolean | null
};

export class SelectedDevice extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      popupVisible: false,
      isDeviceOn: null
    };
  }

  async componentDidMount() {
    this.reset();
    this.setState({
      isDeviceOn: await this.props.apiService.isDeviceOn(this.props.device)
    }) 
  }

  wakeDevice(device: DeviceDto, password: string) {
    this.props.apiService.wakeDevice(device, password);
  }

  popupConfirm(password: string){
    this.wakeDevice(this.props.device, password);
    this.togglePopup();
  }

  togglePopup() {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  private async reset() {
    this.setState({
      isDeviceOn: null
    });
  }

  public render() {
    return <div className="selected-device">
      <div className="selected-device-info">
        <div className="selected-device-name">
          { this.props.device.name }
        </div>
        <div className="selected-device-mac info-item">
          <span className="selected-device-mac-label info-item-label">Mac Address: </span>
          <span className="selected-device-mac-value info-item-value">{ this.props.device.macAddress }</span>          
        </div>
        <div className="selected-device-status info-item">
          <span className="selected-device-status-label info-item-label">Status: </span>
          <span className={`selected-device-status-value info-item-value status-${this.state.isDeviceOn}`}>
            { this.state.isDeviceOn === null ? "Pinging..." : 
              this.state.isDeviceOn === true ? "On" :
              "Off"
            }
          </span>          
        </div>
      </div>
      { this.state.isDeviceOn === false ?
        <div className="selected-device-actions">
          <span className="activate" title="Turn on" onClick={this.togglePopup.bind(this)}>
            <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
          </span>
        </div>  
      :<></>}   
      
      { this.state.popupVisible ? 
        <PasswordPopup 
          action={this.popupConfirm.bind(this)} 
          close={this.togglePopup.bind(this)}
        ></PasswordPopup>
        : <></>}
    </div>;
  }
}
