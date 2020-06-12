import React, { Fragment } from 'react';

function Stack() {
  return (
    <Fragment>
      <h1>Stack</h1>
      <h2>React</h2>
      <ul>
        <li>Redux (Gerenciamento do estado da aplicação)</li>
        <li>Redux-Saga (Middleware para side-effects)</li>
      </ul>
      <h2>Testes</h2>
      <ul>
        <li>Jest (Test Runner, mocks e assertions)</li>
        <li>JsDOM (Grande mock do browser)</li>
        <li>Testing Library (DOM: render, query, assert)</li>
        <li>Redux Saga Test Plan (Iteração e asserção das sagas)</li>
      </ul>
    </Fragment>
  );
}

export default Stack;
