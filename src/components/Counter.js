/** @jsx jsx */
import { Fragment, useState } from 'react';
import { jsx, Input, Button, Label, Flex, Heading } from 'theme-ui';
import refresh from 'images/refresh-ccw.svg';

const DEFAULT_INITIAL_VALUE = 0;

function Counter({ initialValue = DEFAULT_INITIAL_VALUE }) {
  let initialInt = parseInt(initialValue, 10);
  initialInt = initialInt >= 0 ? initialInt : 0;
    
  const [input, setInput] = useState(initialInt);
  const [, setCounter] = useState(initialInt);

  const handleInput = ({ target: { value } }) => {
    let inputValue = parseInt(value, 10);

    if (inputValue >= 0) {
      setCounter(inputValue);
      setInput(inputValue);
      return;
    }
    setInput('');
  };

  const handleIncrement = () =>
    setCounter((prev) => {
      const next = prev + 1;
      setInput(next);
      return next;
    });

  const handleDecrement = () =>
    setCounter((prev) => {
      let next = prev - 1;
      next = next >= 0 ? next : 0;
      setInput(next);
      return next;
    });

  const handleReset = () => {
    setCounter(initialValue);
    setInput(initialValue);
  };

  return (
    <Fragment>
      <Heading as="h1" sx={{ mb: 4 }}>
        Contador
      </Heading>

      <Label htmlFor="counter">Contador</Label>
      <Input
        id="counter"
        type="text"
        sx={{ textAlign: 'center' }}
        onChange={handleInput}
        value={input}
      />

      <Flex sx={{ justifyContent: 'space-around', mt: 3 }}>
        <Button onClick={handleDecrement} variant="secondary">
          Decrementa
        </Button>

        <Button onClick={handleIncrement}>Incrementa</Button>

        <Button onClick={handleReset} variant="reset" title="Reset Button" data-testid="reset-button"><img src={refresh} alt="" /></Button>
      </Flex>
    </Fragment>
  );
}

export default Counter;
