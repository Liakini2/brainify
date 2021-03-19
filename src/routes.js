import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import Stats from './Components/Stats'
import EditUser from './Components/EditUser'
import Tests from './Components/Tests'
import Auth from './Components/Auth'
import About from './Components/About'

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path='/home' component={Home}/>
        <Route path='/stats' component={Stats}/>
        <Route path='/tests' component={Tests}/>
        <Route path='/account' component={EditUser}/>
        <Route path='/about' component={About}/>
    </Switch>
)