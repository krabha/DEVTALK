import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        from: '',
        current: false,
        fieldofstudy: '',
        to: '',
        description: ''
    });

    const {
        school,
        degree,
        from,
        current,
        fieldofstudy,
        to,
        description
    } = formData;

    const [disableToDate, toggleToDate] = useState(false);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
            <form className="form"
                onSubmit={e => {
                    e.preventDefault();
                    addEducation(formData, history);
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date"
                        name="from"
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox"
                            name="current"
                            value={current}
                            onChange={e => {
                                setFormData({ ...formData, current: !current })
                                toggleToDate(!disableToDate)
                            }}
                        /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date"
                        name="to"
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={disableToDate ? 'disabled' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null,
    {
        addEducation
    })(withRouter(AddEducation));