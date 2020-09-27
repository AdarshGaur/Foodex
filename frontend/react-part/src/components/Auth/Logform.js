import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';

class Login extends Component{


    state = { 
     email: "Email",
     password : "password",
     emailError: "",
     passwordError : "",
     redirect:null

  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

valid(){

  if(!this.state.email.includes(".") && this.state.password.length<6){
    this.setState({emailError:"Invalid email", passwordError:"password should be atleast 6 characters long"})
  }

  else if(!this.state.email.includes("."))
  {
    this.setState({emailError:"Invalid email"})
  }
  else if(this.state.password.length<6){
    this.setState({passwordError:"password should be atleast 6 characters long"})
  }
  else{
    return true
  }
}

handlesubmit = (event) => {
if(this.valid()){

 console.log( JSON.stringify(this.state));
 event.preventDefault();
fetch('https://7cccdf3f5c89.ngrok.io/api/token/',{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify(this.state)
}).then((result)=>{
  result.json().then((resp)=>{
    console.log(resp)
    if(resp.access){
      localStorage.setItem("refresh_token",JSON.stringify(resp.refresh))
    localStorage.setItem("access_token",JSON.stringify(resp.access))
    this.setState({redirect:"/"});
    }
    

  })
})

}
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
   <h1 className={classes.headline}>SIGN-IN</h1>
    {/* <label> Email </label><br/> */}
    <input  type="email" name="email" required placeholder= {this.state.email} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.emailError}</p>
    {/* <label> Password </label><br/> */}
    <input  type="password" name="password" required placeholder= {this.state.password} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.passwordError}</p>
    <input type="submit" value="Submit" />
    <p ><Link to='/sign-up'>click to signup </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default Login;