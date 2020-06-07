import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'theme-ui';
import styled from '@emotion/styled';
import Nav from 'components/Navigation';
import pages from '../pages';

function RouteLayout({ children, ...props }) {
  return (
    <Route {...props}>
      <SlideContainer mt={3} mb={3} p={3}>
        <Nav pages={pages} />
        {children}
      </SlideContainer>
    </Route>
  );
}

export default RouteLayout;

const SlideContainer = styled(Container)`
  min-height: 95vh;
  box-shadow: 9px 10px 29px 0px rgba(0, 0, 0, 0.75);
`;
