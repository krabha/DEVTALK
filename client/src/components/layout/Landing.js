import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return  <Redirect to='/dashboard'/>
  }
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
              <hr />
              {/* <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);