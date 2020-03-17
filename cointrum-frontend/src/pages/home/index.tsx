import React from "react";

import { Button, TextField, WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type HomePageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class HomePage extends React.Component<HomePageProps> {
  readonly state: any = {
    message: ""
  };

  handleAddMessage = () => {
    this.props.addMessagetoTest(this.state.message);
  };
  handleRemoveMessage = () => {
    this.props.removeMessagefromTest();
  };

  handleEditText = (e: any) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button onClick={this.handleAddMessage}>Add Message</Button>
        <TextField onChange={this.handleEditText} />
        {this.props.test.messages.map((message: any, idx: any) => (
          <div key={idx}>{message}</div>
        ))}
        <Button onClick={this.handleRemoveMessage}>Remove Message</Button>
      </div>
    );
  }
}

export default connector(wrapStyles(HomePage));
