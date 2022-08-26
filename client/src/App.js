import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import GetProfile from './components/auth/GetProfile';
import './App.css';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './profile-forms/CreateProfile';
import EditProfile from './profile-forms/EditProfile';
import AddExperince from './profile-forms/AddExperince';
import AddEducation from './profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>  {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);
  
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Landing/>
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/get/profile" component={GetProfile} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
                <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
                <PrivateRoute exact path='/add-experience' component={AddExperince}/>
                <PrivateRoute exact path='/add-education' component={AddEducation}/>
                <PrivateRoute exact path='/posts' component={Posts}/>
                <PrivateRoute exact path='/posts/:id' component={Post}/>
              </Switch>
            </section>
          </div>
        </Router>
      </Provider>
    );
  }

export default App;
