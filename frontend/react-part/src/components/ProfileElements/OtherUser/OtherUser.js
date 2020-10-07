import React, {Component} from 'react';
import classes from '../Details/Details.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../Navbar/Navbar';
import UserPosts from './UserPosts'


class OtherUser extends Component {


    state={
        userdetails:[],
        isfollow:"Follow"
    }

//     upload(e){
//         console.warn(e.target.files)
//         const files= e.target.files
//         const formData= new FormData();
//         fetch('http://apiUrl',{
//             method:"POST",
//             body:formData
//         }).then((resp)=>{
//             resp.json().then((result)=>{
//                 console.warn("result",result)
//             })
//         })
//     }

//     componentDidMount(){
//         const userpk= localStorage.getItem('mypk')
//  axios.get('https://8a5f7f0c745b.ngrok.io/user/2/' 
// //  +userpk+'/'
//  ,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//                 },
                
//             })
//             .then((resp)=>{
//                 console.log(resp.data)    
//                 this.setState({userdetails: resp.data})
//               })

//     }


handlefollow=()=>{
    if(this.state.isfollow==="Follow"){
        this.setState({isfollow:"Unfollow"})
    }
    else{
        this.setState({isfollow:"Follow"})
    }
}

render(){    
    return (
      <>
<NavigationBar/>

<div className={classes.totalwrap}>
<div className={classes.bookmarks}>
{/* <button className={classes.bookmarkbtn}> <i className="fa fa-bookmark" aria-hidden="true"></i>
<Link className={classes.savetext} to="/bookmarks"><span >My Bookmarks</span></Link></button> */}
</div>
<div className={classes.cover}>
<div className={classes.wrapper}>
<div className={classes.dp}>
<img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
{/* <input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={(e)=>this.upload(e)} name="img" accept="image/*" /> */}
<label onClick={this.handlefollow} className={classes.change}>{this.state.isfollow}</label>
</div>
<h3>MS Dhoni
    {/* {this.state.userdetails.name} */}
</h3>
{/* <p className={classes.bookmark}>my bookmarks</p> */}
</div>

<div className={classes.options}>
     <div className={classes.profilenums}>
        <h5 className={classes.headingnums}>Following</h5>
        <p className={classes.nums}>34</p>
        </div>
       
    
   <div className={classes.profilenums}>
        <h5 className={classes.headingnums}>Followers</h5>
        <p className={classes.nums}>34</p>     
    </div>
   
<div className={classes.profilenums}>
        <h5 className={classes.headingnums}>Posts</h5>
        <p className={classes.nums}>34</p>
    </div>

</div>

</div>
</div>

<UserPosts/>

</>
  );
}
}


export default OtherUser;