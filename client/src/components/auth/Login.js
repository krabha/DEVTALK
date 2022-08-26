import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ isAuthenticated, login }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const clickSubmit = async e => {
    e.preventDefault();
    // const newUser = { email, password };
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <div className="container mt-10">
        <form onSubmit={e => clickSubmit(e)}>

          <div className="form-group">
            <input
              className='form-control'
              placeholder="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              className='form-control'
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => handleChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>

      </div>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,
  {
    setAlert,
    login
  })(Login);