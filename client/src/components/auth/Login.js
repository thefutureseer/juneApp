import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {name, email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => { 
    e.preventDefault();
    console.log('success');
  };

  return <Fragment>
  <h1 className="large text-primary">Sign Up</h1>
  <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
  <form className="form" onSubmit={e => onSubmit(e)}>
    <div className="form-group">
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={name}
        onChange={e => onChange(e)}
        required 
      />
    </div>
    <div className="form-group">
      <input 
      type="email" 
      placeholder="email" 
      name="email" 
      value={email} 
      onChange={e => onChange(e)} 
      required/>
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={e => onChange(e)}
        required
        minLength="6"
      />
    </div>
    <input type="submit" className="btn btn-primary" value="Login" />
  </form>
  <p className="my-1">
    Dont already have an account? <Link to="/register">sign up</Link>
  </p>
</Fragment>
};

export default Login;