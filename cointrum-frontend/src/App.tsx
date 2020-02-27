import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import configureStore from "store";
import Routes from "routes";
import history from "services/history";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
