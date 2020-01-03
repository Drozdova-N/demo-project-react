import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom'
import HomePage from "./page/HomePage";
import SignIn from "./page/SignIn"
import SignUp from "./page/SignUp";
import './App.css';
import {Redirect} from "react-router-dom"
import LoggedIn from "./util/LoggedIn";
class App extends Component{

    render() {
     return (
         <Switch>
             <Route exact path='/home' >
                 {LoggedIn.getCookie("Auth-token")==null ? <Redirect to='/signIn'/> : <HomePage/>}
             </Route>
             <Route exact path="/signIn">
                 {LoggedIn.getCookie("Auth-token")==null ? <SignIn/> : <Redirect to='/home'/>}
             </Route>
             <Route exact path='/signUp'>
                 <SignUp/>
             </Route>
         </Switch>
     );
    }
}
export default App;
