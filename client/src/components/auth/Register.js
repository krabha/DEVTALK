import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password, password2 } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const clickSubmit = async e => {
    e.preventDefault();
    const newUser = { name, email, password };
    // console.log('success');

    if (password !== password2) {
      setAlert('Passwords did not match!', 'danger');
    } else {
      // console.log('Success!');
      register(newUser);
      //   try {
      //     const config = {
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     }
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post('/api/users', body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.log(err);
      //   }
    }
  }

  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <div className="container mt-10">
        <form onSubmit={e => clickSubmit(e)}>
          <div className="form-group">
            <input
              className='form-control'
              placeholder="Name"
              name="name"
              type="text"
              value={name}
              onChange={e => handleChange(e)}
            />
          </div>

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
          <div className="form-group">
            <input
              className='form-control'
              placeholder="Password for confirmation"
              name="password2"
              type="password"
              value={password2}
              onChange={e => handleChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>

      </div>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,
  {
    setAlert,
    register
  })(Register);