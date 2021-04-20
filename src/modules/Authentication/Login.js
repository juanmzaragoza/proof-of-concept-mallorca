import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Logo from "assets/img/logo.png";

import Password from './password.input';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, ] = useState(false);

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    history.push("/");
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
              type='email'
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

          {error && <p className='auth-warning'>Invalid Email or Password</p>}
          <Link className='reset-link' to='/forgot-password' >Forgot password?</Link>
          <Button type='submit' color='secondary' variant='outlined' className='accessBtn'>
            Login
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default Login;