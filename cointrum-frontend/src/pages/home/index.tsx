import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "store";

import { addMessagetoTest } from "store/learning/actions/test.action";

const mapStateToProps = (state: AppState) => ({
  test: state.learning.test
});

const connector = connect(mapStateToProps, { addMessagetoTest });

type HomePageProps = ConnectedProps<typeof connector> & {
  // Insert Handin Props
};

class HomePage extends React.Component<HomePageProps> {
  handleTestClick = () => {
    this.props.addMessagetoTest("TestingMessage");
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.handleTestClick}>Add Message</button>
        {this.props.test.messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
        <button onClick={this.handleTestClick}>Remove Message</button>
      </div>
    );
  }
}

export default connector(HomePage);
