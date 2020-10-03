import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'

class ForgotOtpform extends Component{


  state = { 
      email: localStorage.getItem('resetmail'),
    otp:"otp"
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}


handlesubmit = (event) => {


  // console.log( JSON.stringify(this.state));
const data={
    email:this.state.email,
  otp: this.state.otp
}
  event.preventDefault();
//   ServerService.login(data)
console.log(data)
// axios.post('https://776d58591d10.ngrok.io/auth/forgot-password/otp/',data)
ServerService.forgototp(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      // localStorage.setItem("token", "abcd");
    //   localStorage.setItem("refresh_token",resp.data.refresh)
    //   localStorage.setItem("access_token",resp.data.access)
      this.setState({ redirect: "/change-password" });
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
   <h1 className={classes.headline}>Verify Email</h1>
    {/* <label> Email </label><br/> */}
    <input  type="number" name="otp"  placeholder={this.state.otp}  
    onChange={this.handlechangeall} /> <br/>
    <input type="submit" value="Submit" className={classes.sub} />
    <p ><Link to='/sign-up'>click to signup </Link></p>
    <p ><Link to='/sign-in'>click to login </Link></p>
    
   </form>
   </div>
  </div>
 )
}

}

export default ForgotOtpform;