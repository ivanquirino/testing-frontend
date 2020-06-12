/** @jsx jsx */
import { jsx, Button, Input, Label, Text } from 'theme-ui';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { PENDING } from 'state/constants';
import { fetchProfile, updateProfile } from 'state/ducks/userProfile';

const selector = (state) => state.userProfile.values;

const messageSelector = createSelector(
  [(state) => state.userProfile.success, (state) => state.userProfile.error],
  (success, error) => {
    let message = success;
    let color = 'green';

    if (error) {
      message = error;
      color = 'primary';
    }

    return { message, color };
  }
);

const statusSelector = createSelector(
  (state) => state.userProfile.status,
  (status) => {
    const disabled = status === PENDING;
    const buttonVariant = disabled ? 'disabled' : 'primary';

    return { status, disabled, buttonVariant };
  }
);

function UserForm() {
  const dispatch = useDispatch();
  const stateValues = useSelector(selector);  
  const { message, color} = useSelector(messageSelector);
  const { disabled, buttonVariant } = useSelector(statusSelector);
  const [values, setValues] = useState(stateValues);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setValues(stateValues);
  }, [stateValues]);

  const { fullname, contact } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(values));
  };

  return (
    <div sx={{ mb: 5 }}>
      <h1>Formulário Assíncrono</h1>
      <Text color={color} sx={{ height: '2rem' }}>
        {message}
      </Text>

      <form onSubmit={handleSubmit}>
        <div sx={{ mb: 4 }}>
          <Label htmlFor="fullname">Nome Completo</Label>
          <Input
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={handleChange('fullname')}
          />
        </div>
        <div sx={{ mb: 4 }}>
          <Label htmlFor="contact">Contato</Label>
          <Input
            id="contact"
            name="contact"
            value={contact}
            onChange={handleChange('contact')}
          />
        </div>
        <Button type="submit" disabled={disabled} variant={buttonVariant}>
          Salvar
        </Button>
      </form>
    </div>
  );
}

export default UserForm;
