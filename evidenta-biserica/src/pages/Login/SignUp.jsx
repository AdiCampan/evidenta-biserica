import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '../../services/auth';

const emailValidation = {
  required: {
    value: true,
    message: 'Email is required',
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address"
  }
};


const SignUp = () => {
  const [signupUser, result] = useSignupMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>{
    console.log(data);
    // signupUser({ email: data.email, password: data.password });
  };

  
  const passwordConfirmValidation = {
    required: {
      value: true,
      message: 'Password confirm is required'
    },
    validate: (val) => {
      if (watch('password') != val) {
        return "Your passwords do not match";
      }
    },  
  };

  console.log('errors', errors);

  return (
    <div id="login">
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-info">Signup</h3>
                {/* <div className="form-group">
                  <label for="name" className="text-info">Nume si Prenume:</label><br />
                  <input {...register('name', { required: true })} type="text" className="form-control" />
                  {errors.username && <p className="error">Name is required.</p>}
                </div> */}

                <div className="form-group">
                  <label for="email" className="text-info">email:</label><br />
                  <input {...register('email', emailValidation)} type="text" className="form-control" />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                {/* <div className="form-group">
                  <label for="username" className="text-info">Username:</label><br />
                  <input {...register('username', { required: true })} type="text" className="form-control" />
                  {errors.username && <p className="error">Username is required.</p>}
                </div> */}
                <div className="form-group">
                  <label for="password" className="text-info">Password:</label><br />
                  <input {...register('password', { required: true })} type="password" className="form-control" />
                  {errors.password && <p className="error">Password is required.</p>}
                </div>

                <div className="form-group">
                  <label for="passwordConfirm" className="text-info">Reapet Password:</label><br />
                  <input {...register('passwordConfirm', passwordConfirmValidation)} type="password" className="form-control" />
                  {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}
                </div>
                <div className="form-group">
                  {/* <label for="remember-me" className="text-info">
                    <span>Remember me</span>&nbsp;
                    <span><input id="remember-me" name="remember-me" type="checkbox" /></span>
                  </label> */}
                  <br />
                  <button type="submit" name="submit" className="btn btn-info btn-md">submit</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;