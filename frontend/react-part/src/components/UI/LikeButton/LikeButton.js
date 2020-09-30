import React, {Component} from 'react';
import classes from './LikeButton.module.css';



class LikeButton extends Component {

    state = {
        likes: 0,
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
            
                <button onClick={this.addLike} ClassName={classes.likebtn} >Likes: {this.state.likes} </button>
            )
        }

        else{
            return (
            
                <button onClick={this.addLike} ClassName={classes.likebtn} > {this.state.likes} </button>
            )
        }
        
    }
}

export default LikeButton;