import React from 'react';
import { useForm } from 'react-hook-form';
import SignUp from './SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";


import './Login.css';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div id="login">
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="username" className="text-info">Username:</label><br />
                  <input {...register('username', { required: true })} type="text" className="form-control" />
                  {errors.username && <p className="error">Username is required.</p>}
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">Password:</label><br />
                  <input {...register('password', { required: true })} type="password" className="form-control" />
                  {errors.password && <p className="error">Password is required.</p>}
                </div>
                <div className="form-group">
                  <label for="remember-me" className="text-info">
                    <span>Remember me</span>&nbsp;
                    <span><input id="remember-me" name="remember-me" type="checkbox" /></span>
                  </label>
                  <br />
                  <button type="submit" name="submit" className="btn btn-info btn-md">submit</button>
                </div>
                <div id="register-link" className="text-right">
                <Link to="/signup">Register here</Link>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
