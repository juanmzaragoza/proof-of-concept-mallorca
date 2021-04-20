import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Logo from "assets/img/logo.png";

import Password from './password.input';
import AuthLayout from './AuthLayout';
import {Loading} from "../ReactGrid/Loading";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, ] = useState(false);

  const history = useHistory();

  useEffect(() => {
    return () => {
      props.actions.clear();
    }
  });

  /** When is authenticated throughout the service*/
  useEffect(()=>{
    if(props.authenticated) {
      history.push('/');
    }
  },[props.authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    props.actions && props.actions.authenticate({user: email, password});
  };

  return (
    <AuthLayout>
      <Card className='auth-card' id='login' style={{ color: 'white' }}>

        <div className='welcome-message'>
          <img src={Logo} alt='logo-vector' />
          <h4>Welcome</h4>
        </div>

        <form autoComplete='off' className='auth-form' onSubmit={handleLogin}>
          <FormControl>
            <OutlinedInput
              placeholder='Email'
              error={error}
              fullWidth
              variant='outlined'
              className='auth-inputs'
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              type='input'
              autoFocus={true}
              required
            />
          </FormControl>
          <FormControl>
            <Password
              required
              fullWidth
              error={error}
              placeholder='Password'
              variant='outlined'
              className='auth-inputs'
              notched={false}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </FormControl>

          {props.error && <p className='auth-warning'>Invalid Email or Password</p>}
          <Link className='reset-link' to='/forgot-password' >Forgot password?</Link>
          <Button disabled={props.loading} type='submit' color='secondary' variant='outlined' className='accessBtn'>
            Login {props.loading && <Loading size={24} />}
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  actions: PropTypes.any
}

export default Login;