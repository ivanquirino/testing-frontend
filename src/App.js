import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import RouteLayout from 'components/RouteLayout';
import End from 'components/End';
import theme from './theme';
import pages from './pages';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
