import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link} from 'react-router-dom';

class Login extends Component{


    state = { 
     email: "Enter your email ID",
     password : "password"
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

handlesubmit = (event) => {

 console.log( JSON.stringify(this.state));
 event.preventDefault();
fetch('https://reqres.in/api/login',{
  method: "POST",
  headers: {
    "Accept": "application.json",
    "Content-Type": "application/json"
  },
  body:JSON.stringify(this.state)
}).then((result)=>{
  result.json().then((resp)=>{
    console.log(resp)
  })
})

}

render(){
 return(
  <div className={classes.signup}>
    <div className={classes.imgbox}>

    </div>
    <div className={classes.formup}>
   <form onSubmit = {this.handlesubmit} >
   <h1 className={classes.headline}>SIGN-IN</h1>
    <label> Email </label><br/>
    <input  type="email" name="email" placeholder= {this.state.email} 
    onChange={this.handlechangeall} /> <br/>

    <label> Password </label><br/>
    <input  type="password" name="password" placeholder= {this.state.phone} 
    onChange={this.handlechangeall} /> <br/>

    <input type="submit" value="Submit" />
    <p ><Link to='/sign-up'>click to signup </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default Login;