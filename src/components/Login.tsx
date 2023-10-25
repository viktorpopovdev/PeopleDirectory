import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { login } from '../features/User';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './Login.module.css';

import axios from 'axios';

function Login() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  async function submitHandler() {
    const { username, password } = form.values;
    try {
      const { data, status } = await axios.post(
        'https://technical-task-api.icapgroupgmbh.com/api/login/',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        dispatch(login());
      }

      console.log(data, status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
    navigate('/directory');
  }

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => value.trim().length < 6 && 'Wrong username ',
      password: (value) => value.trim().length < 8 && 'Wrong password',
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form className={classes.inputs} onSubmit={form.onSubmit(submitHandler)}>
          <TextInput
            classNames={{ input: classes.input }}
            withAsterisk
            label="Username"
            placeholder=""
            {...form.getInputProps('username')}
          />
          <PasswordInput
            classNames={{ input: classes.input }}
            withAsterisk
            label="Password"
            placeholder=""
            {...form.getInputProps('password')}
          />
          <Button classNames={{ root: classes.button }} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
