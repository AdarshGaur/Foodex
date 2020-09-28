import React from 'react';
import classes from './Recipecard.module.css';
import img5 from "../../images/img-5.png"

function Recipecard(props){
return(
    <div className={classes.recipebox}>
        <div className={classes.desc}>
            
            <div className={classes.title}>
            {/* <div className={classes.vertline}></div> */}
                <a>{props.name}</a>
                <a>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it</a>
                </div>
                
        </div>
        <div className={classes.foodimg}>
            <img src={img5}></img>
        </div>
    </div>
 
)
}

export default Recipecard;