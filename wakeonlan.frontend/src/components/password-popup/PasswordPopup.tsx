import React from "react";
import "./PasswordPopup.scss";

type Props = {
  action: (password: string) => void,
  close: () => void
};
type State = {
  password: string
};

export class PasswordPopup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      password: ""
    };
  }

  componentDidMount(): void {
    this.reset();
  }

  close() {
    this.props.close();
    this.reset();
  }

  confirm() {
    this.props.action(this.state.password);
    this.reset();
  }

  reset() {
    this.setState({
      password: ""
    });
  }

  public render() {
    return <div className="popup-container modal modal-open d-flex">
      <div className="password-popup modal-dialog">
        <div className="modal-content bg-dark">
          <div className="popup-header modal-header">
            <span className="modal-title">Insert password</span>            
          </div>
          <div className="popup-body modal-body">
            <input 
              type="password" 
              name="password" 
              className="form-control"
              value={this.state.password} 
              onChange={x => this.setState({password: x.target.value})}
            />
          </div>
          <div className="popup-footer modal-footer">
            <div 
            onClick={this.close.bind(this)}
            className="btn btn-danger"
            >Cancel</div>
            <div 
              onClick={this.confirm.bind(this)}
              className="btn btn-primary"
            >Confirm</div>
          </div>
        </div>
      </div>
    </div>;
  }
}
