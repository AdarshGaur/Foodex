import React, {Component} from 'react';
import classes from './LikeButton.module.css';
import axios from 'axios';
import ServerService from '../../../services/serverService';

class LikeButton extends Component {

    state = {
        // likes: 0,
        isclicked: false
    };


    addLike = () => {
 
          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        const data={
            pk: this.props.pk
        }
        console.log(data)
        // axios.post('https://776d58591d10.ngrok.io/recipe/like/', data)

        // axios.post('https://776d58591d10.ngrok.io/recipe/like/', data,
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //     },
            
        // }) 

        ServerService.like(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(this.state.isclicked){
            return (
            
                <button onClick={this.addLike} className={classes.likebtn} >
                    <i className="fa fa-heart" aria-hidden="true"></i> 1
                </button>
            )
        }

        else{
            return (
            
                <button onClick={this.addLike} className={classes.likebtn} > 
                <i className="far fa-heart"></i> 0 
                </button>
            )
        }
        
    }
}

export default LikeButton;