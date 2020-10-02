import React, {Component} from 'react';
import classes from './LikeButton.module.css';



class LikeButton extends Component {

    state = {
        // likes: 0,
        isclicked: false
    };


    addLike = () => {
        let newCount = this.state.likes + 1;
          this.setState({
          likes: newCount,
          isclicked: ((this.state.isclicked)?false:true)
        });
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