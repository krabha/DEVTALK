import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading..."
            // style={{width:"20px"}}
            />
        </Fragment>
    )
}

export default Spinner;