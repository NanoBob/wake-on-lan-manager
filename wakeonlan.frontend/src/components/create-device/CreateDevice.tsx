import React from "react";
import { ApiService } from "../../services/ApiService";
import { DeviceDto } from "../../client/data-contracts";
import "./CreateDevice.scss";

type Props = {
  apiService: ApiService,
  created: (device: DeviceDto) => void
};
type State = {
  name: string,
  macAddress: string,
  password: string,
};

export class CreateDevice extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      macAddress: "00:00:00:00:00:00",
      password: ""
    };
  }

  async create() {
    const device = await this.props.apiService.createDevice({
      name: this.state.name,
      macAddress: this.state.macAddress,
      password: this.state.password
    });
    this.props.created(device);
    this.setState({
      name: "",
      macAddress: "00:00:00:00:00:00",
      password: ""
    });
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    } as any);
  }

  public render() {
    return <div className="create-device card bg-dark">
      <div className="form-wrapper form px-4 form-group">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input className="form-control form-control-sm" type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Mac Address</label>
        <input className="form-control form-control-sm" type="text" name="macAddress" value={this.state.macAddress} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Password</label>
        <input className="form-control form-control-sm" type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="btn-wrapper mb-3">
          <div className="btn btn-primary" onClick={this.create.bind(this)}>Confirm</div>
        </div>
      </div>
    </div>;
  }
}
