import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import configureStore from "store";
import Routes from "routes";
import history from "services/history";
import theme from "shared-components/theme/Theme";
import Layout from "shared-components/layout/Layout";
import "typeface-roboto";

const store = configureStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router history={history}>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
