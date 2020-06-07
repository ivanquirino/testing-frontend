/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Button, Flex } from 'theme-ui';
import { Link, useLocation, matchPath } from 'react-router-dom';

function Navigation({ pages = []}) {
  const location = useLocation();
  const { pathname } = location;

  const match = matchPath(pathname, { path: '/:page', exact: true });
  const page = !match ? 0 : parseInt(match.params.page, 10);
  const next = page + 1;
  
  let previous = page - 1;
  previous = previous < 0 ? 0 : previous;
  let toPrevious = `/${previous}`;
  if (previous === 0) toPrevious = '/';

  const end = page === pages.length;
  const start = page === 0;

  return (
    <Flex sx={{ justifyContent: 'space-between', mb: 4 }}>
      <div>
        {!start && (
          <Link to={toPrevious}>
            <Button variant="secondary">Anterior</Button>
          </Link>
        )}
      </div>      
      {!end && (
        <Link to={`/${next}`}>
          <Button>Próximo</Button>
        </Link>
      )}
    </Flex>
  );
}

export default Navigation;
