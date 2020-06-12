import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import RouteLayout from 'components/RouteLayout';
import End from 'components/End';
import theme from './theme';
import pages from './pages';
import store from 'state/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {pages.map((Component, i) => {
              const path = i === 0 ? '/' : `/${i}`;

              return (
                <RouteLayout key={i} exact path={path}>
                  <Component />
                </RouteLayout>
              );
            })}
            <RouteLayout>
              <End />
            </RouteLayout>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
