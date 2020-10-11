import React, {Component} from 'react';
import classes from './Details.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/serverService';



class Details extends Component {


    state={
        userdetails:[],
        profileimg:""
    }


    handleimg=(e)=>{


        // this.setState({profileimg:})

        // const data={
        // img: this.state.profileimg
        // }

        const file=e.target.files[0];
        
        const formdata = new FormData();

        formdata.append('image_user', file);

        axios.put('https://78c80ca055b6.ngrok.io/user/change-profile/',formdata,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            
        }
        )
        .then((resp)=>{
            console.log(resp)
       
          })

    }


    componentDidMount(){

        ServerService.userdetails()
        .then((resp)=>{
                console.log(resp.data)    
                this.setState({userdetails: resp.data})
              })
    }


render(){    
    return (
      <>
<div className={classes.totalwrap}>
<div className={classes.bookmarks}>
<button className={classes.bookmarkbtn}> <Link to='/bookmarks' className={classes.bookbtn}><i className="fa fa-bookmark" aria-hidden="true"></i></Link>
<Link className={classes.savetext} to="/bookmarks"><span >My Bookmarks</span></Link></button>
</div>
<div className={classes.cover}>
<div className={classes.wrapper}>
<div className={classes.dp}>
<img src={this.state.userdetails.image_user}/>
<input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={this.handleimg} name="file" accept="image/*" />
<label className={classes.change} htmlFor="uploadpic">Change Picture</label>
</div>
<h3> 
    {this.state.userdetails.name}
</h3>
</div>

<div className={classes.options}>
     <Link to="/following" className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Following</h5>
        <p className={classes.nums}>{this.state.userdetails.following}</p>
        </div>
        </Link>
    
    <Link to="/followers"  className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Followers</h5>
        <p className={classes.nums}>{this.state.userdetails.followers}</p>     
    </div>
    </Link>
    <Link className={classes.profilenums} to="/profile"><div>
        <h5 className={classes.headingnums}>Posts</h5>
        <p className={classes.nums}>{this.state.userdetails.post_count}</p>
    </div></Link>

</div>

</div>
</div>


</>
  );
}
}


export default Details;