import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../contextT/AuthContext";

export const Navbar = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)



    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

     return (
     <nav>
     <div className="nav-wrapper purple darken-1" style ={{ padding: '0 2rem'}}>
         <div className="nav-wrapper purple darken-1">
     <span className="brand-logo">Users</span>
     <ul id="nav-mobile" className="right hide-on-med-and-down">
         <li><a href ="/" onClick={logoutHandler}>Logout</a></li>

     </ul>
     </div>
     </div>
     </nav>

     )
}