import React, {Component} from 'react';
import classes from './BookmarkButton.module.css';



class BookmarkButton extends Component {

    state = {
        isclicked: false
    };


    handlechange = () => {
          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });
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
                <i class="far fa-bookmark"></i>
                </button>
            )
        }
        
    }
}

export default BookmarkButton;