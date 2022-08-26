import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt="" className='round-img' />
            <div>
                <p>{status} {company && <span>{company}</span>}</p>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                {<Link
                    to={`profile/${_id}`}
                >
                    View Profile
                </Link>}
                {skills.slice(0,4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i>{' '}
                        {skill}
                    </li>
                ))}
            </div>
            
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem;