import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'

class Otpform extends Component{
  
    state = {   email: localStorage.getItem('email'),
      otp: "otp",
      redirect: null
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}



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
    {/* <label> Full Name </label><br/> */}
    <input  type="number" name="otp"  placeholder={this.state.otp}  
    onChange={this.handlechangeall} /> <br/>

    <input type="submit" value="Submit" className={classes.sub}/>
    {/* <p ><Link to='/otp'>click to login </Link></p> */}
   </form>
   </div>
  </div>
 )
}

}

export default Otpform;