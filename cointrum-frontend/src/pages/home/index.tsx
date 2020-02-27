import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";

import { addMessagetoTest } from "store/learning/actions/test.action";

interface HomePageProps {
  addMessagetoTest: (message: string) => void;
  test: AppState["learning"]["test"];
}

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
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  test: state.learning.test
});

export default connect(mapStateToProps, { addMessagetoTest })(HomePage);
