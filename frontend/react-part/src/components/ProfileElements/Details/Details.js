import React, {Component} from 'react';
import classes from './Details.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';



class Details extends Component {


    state={
        userdetails:[]
    }

    upload(e){
        console.warn(e.target.files)
        const files= e.target.files
        const formData= new FormData();
        fetch('http://apiUrl',{
            method:"POST",
            body:formData
        }).then((resp)=>{
            resp.json().then((result)=>{
                console.warn("result",result)
            })
        })
    }

    componentDidMount(){
        const userpk= localStorage.getItem('mypk')
 axios.get('https://8a5f7f0c745b.ngrok.io/user/2/' 
//  +userpk+'/'
 ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                
            })
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
<button className={classes.bookmarkbtn}> <i className="fa fa-bookmark" aria-hidden="true"></i>
<Link className={classes.savetext} to="/bookmarks"><span >My Bookmarks</span></Link></button>
</div>
<div className={classes.cover}>
<div className={classes.wrapper}>
<div className={classes.dp}>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-fzwMTk8dQytNQnl1vC97OHhsrGaEa2RFAg&usqp=CAU"/>
<input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={(e)=>this.upload(e)} name="img" accept="image/*" />
<label className={classes.change} htmlFor="uploadpic">Change Picture</label>
</div>
<h3> Rakshit
    {/* {this.state.userdetails.name} */}
</h3>
</div>

<div className={classes.options}>
     <Link to="/following" className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Following</h5>
        <p className={classes.nums}>34</p>
        </div>
        </Link>
    
    <Link to="/followers"  className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Followers</h5>
        <p className={classes.nums}>34</p>     
    </div>
    </Link>
    <Link className={classes.profilenums} to="/profile"><div>
        <h5 className={classes.headingnums}>Posts</h5>
        <p className={classes.nums}>34</p>
    </div></Link>

</div>

</div>
</div>


</>
  );
}
}


export default Details;