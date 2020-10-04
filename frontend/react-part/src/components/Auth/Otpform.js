import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Otpform extends Component{
  
    state = {   email: localStorage.getItem('email'),
      otp: "otp",
      redirect: null,
      ageError:"fine"
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

createSuccess = (info) => {
  NotificationManager.success( info, 'Success');
};

handlesubmit = (event) => {
  
const data={
  email: this.state.email,
  otp: this.state.otp
}
              
  event.preventDefault();
console.log(data)
  // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/',data)
  ServerService.otp(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      // localStorage.setItem("token", "abcd");
      console.log(resp)
      localStorage.setItem("refresh_token",resp.data.refresh)
      localStorage.setItem("access_token",resp.data.access)
      this.setState({ redirect: "/" });
    }
  
  })
  .catch(error => console.log(error.resp))

 }

 
resend = (event) => {
  
const resenddata={
  email: this.state.email
}
              
  event.preventDefault();
console.log(resenddata)
  // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/resend/',resenddata)
  ServerService.resendotp(resenddata)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      console.log(resp)
      this.createSuccess("OTP sent again")
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
   <h1 className={classes.headline}>Enter OTP</h1>
   <label className={classes.labelfield}> OTP </label><br />
    <input  type="number" className={classes.field} name="otp" required placeholder={this.state.age}  
    onChange={this.handlechangeall}/> <br/>
    <p className={(this.state.ageError==="fine")? classes.invisible: classes.visible}>{this.state.ageError}</p>

    <input type="submit" value="Submit" className={classes.sub}/><br/>
    <p className={classes.reotp} onClick={this.resend}><span className={classes.linkswitch1}> Resend OTP </span></p>
   </form>
   </div>
  </div>
 )
}

}

export default Otpform;