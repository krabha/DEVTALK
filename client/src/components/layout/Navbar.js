import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <Link to='/dashboard'>
        <i className="fas fa-user">{' '}</i>
        Dashboard
      </Link>
      <li className="nav-item">
        <a
          to='/'
          className="nav-link"
        >
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="#!"
          onClick={logout}
        ></a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      {/* <div className="container"> */}
      <Link className="navbar-brand" to="/profiles">
        DevConnector
          </Link>

      <Link className="navbar-brand" to="/posts">
        Posts
          </Link>

      <ul className="navbar-nav">

        {!isAuthenticated && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Signup
          </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
          </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated && !loading && (
          <Fragment>
            <li className="nav-item">
              <a href="!#"
                onClick={logout}
              >
                Logout
            </a>
            </li>
          </Fragment>
        )}
      </ul>
      {/* </div> */}
    </nav>
  );
}

Navbar.propTypes = {
  auth: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,
  {
    logout
  })(Navbar);