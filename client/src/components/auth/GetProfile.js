import axios from 'axios';
import React, { Fragment, useState } from 'react';

const GetProfile = () => {  

  const getAllProfiles = () => {
    axios.get('http://localhost:5000/api/profile/github/Bucephalus-lgtm')
    .then((response) => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  }
  return (
    <Fragment>
      <h3>BHARGAB</h3>
      {getAllProfiles()}
    </Fragment>
  )
}

export default GetProfile;