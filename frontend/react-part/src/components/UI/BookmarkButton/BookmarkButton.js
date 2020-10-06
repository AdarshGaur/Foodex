import React, {Component} from 'react';
import classes from './BookmarkButton.module.css';
import axios from 'axios';
import ServerService from '../../../services/serverService';


class BookmarkButton extends Component {

    state = {
        isclicked: false
    };


    handlechange = () => {
          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        const data={
            pk: this.props.pk
        }
        console.log(data)

        // axios.post('https://776d58591d10.ngrok.io/recipe/bookmark/', data,
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //     },
            
        // }) 
        ServerService.bookmark(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(this.state.isclicked){
            return (
            
                <button onClick={this.handlechange} className={classes.bookmarkbtn} >
                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                </button>
            )
        }

        else{
            return (
            
                <button onClick={this.handlechange} className={classes.bookmarkbtn} > 
                <i className="far fa-bookmark"></i>
                </button>
            )
        }
        
    }
}

export default BookmarkButton;