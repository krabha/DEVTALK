import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => { 
        getCurrentProfile()
    }, [getCurrentProfile]);

    return loading && profile == null ? <Spinner />
        :
        <Fragment>
            <h1 className="text-primary large">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>{' '}
                Welcome {user && user.name}!
                {profile === null ? (
                    <Fragment>
                        <p className="lead">
                            You have not yet created your profile!!!
                    </p>
                        <Link to='/create-profile' className='btn btn-primary'>
                            Create Profile
                </Link>
                    </Fragment>
                )
                    :
                    (
                        <Fragment>
                            <DashboardAction />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                            <button className="btn btn-danger"
                            onClick={()=> deleteAccount()}
                            >
                                <i className="fas fa-user-minus"></i>{' '}
                                Delete your account
                            </button>
                        </Fragment>

                    )}
            </p>
        </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount
})(Dashboard);
