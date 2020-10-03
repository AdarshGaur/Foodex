import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService';

class PassResetform extends Component{


    state = { 
    email: localStorage.getItem('resetmail'),
     password : "Password",
     confirm_password : "Confirm password",

  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}



handlesubmit = (event) => {

    const data={
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password
      }
  
    //  console.log( JSON.stringify(this.state));                 
    event.preventDefault();
  
    console.log(data);
  
  axios.post('https://776d58591d10.ngrok.io/auth/forgot-password/new-password/', data)
//   ServerService.login(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 202) {
      // localStorage.setItem("token", "abcd");
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
   <h1 className={classes.headline}>Reset Password</h1>

    <input  type="password" name="password" required placeholder= {this.state.password} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.passwordError}</p>

    <input  type="password" name="confirm_password" required placeholder= {this.state.confirm_password} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.confirmError}</p>

    <input type="submit" value="Submit" className={classes.sub}/>
    <p ><Link to='/sign-in'>click to login </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default PassResetform;