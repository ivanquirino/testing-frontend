/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Box, Heading } from 'theme-ui';

function TestingFrontend() {
  return (
    <Fragment>
      <Box>
        <Heading as="h1" sx={{ textAlign: 'center', mb: 5 }}>
          Testando o Front-end
        </Heading>
        <Heading sx={{ textAlign: 'center' }}>Ivan Quirino</Heading>
      </Box>
    </Fragment>
  );
}

export default TestingFrontend;
