import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'

class Forgotform extends Component{


  state = { 
    email: "Email",
    emailError: "",

  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}



handlesubmit = (event) => {


  // console.log( JSON.stringify(this.state));
const data={
  email: this.state.email,

}
  event.preventDefault();
//   ServerService.login(data)
console.log(data)
axios.post('https://776d58591d10.ngrok.io/auth/forgot-password/',data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      // localStorage.setItem("token", "abcd");
      localStorage.setItem("refresh_token",resp.data.refresh)
      localStorage.setItem("access_token",resp.data.access)
      this.setState({ redirect: "/forgot-otp" });
    }
  
  })



}

render(){

  if(this.state.redirect){
    return <Redirect to= {this.state.redirect} />
  }

 return(
  <div className={classes.signup}>
    <div className={classes.imgbox}>

    </div>
    <div className={classes.formup}>
   <form onSubmit = {this.handlesubmit} >
   <h1 className={classes.headline}>Enter Your Email</h1>
    <input  type="email" name="email" required placeholder= {this.state.email} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.emailError}</p>
    <input type="submit" value="Submit" className={classes.sub} />
    <p ><Link to='/sign-up'>click to signup </Link></p>
    <p ><Link to='sign-in'>click to login  </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default Forgotform;