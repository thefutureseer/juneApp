import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Register = () => {
  const [ formData, setFormData ] = useState({
    name: '',
    phone: '',
    password: '',
    password2: ''
  });

  const {name, phone, password, password2} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => { 
    e.preventDefault();
    if(password !== password2) {
      console.log("passwords do not match");
    } else {
      console.log('success');
    }
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
      <input type="phone" placeholder="phone number" name="phone" value={phone} onChange={e => onChange(e)} required/>
      <small className="form-text">Vote to use profile pictures coming soon</small>
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
    <div className="form-group">
      <input
        type="password"
        placeholder="Confirm Password"
        name="password2"
        value={password2}
        onChange={e => onChange(e)}
        required
        minLength="6"
      />
    </div>
    <input type="submit" className="btn btn-primary" value="Register" />
  </form>
  <p className="my-1">
    Already have an account? <Link to="/login">Sign In</Link>
  </p>
</Fragment>
};

export default Register;