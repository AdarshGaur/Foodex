import classes from './Hero.module.css';
import React from 'react';
import video from '../../assets/videos/video.mp4';


function Hero(){
    return(
<div className={classes.herocontainer}>

<video autoPlay loop muted>
  <source src={video} type="video/mp4" />
</video>

<div className={classes.overlayText}>
        <p>Foodex</p>
    </div>
{/* 
<h1>FOODEX</h1>
<p>Hunger Is Good!</p> */}

</div>
)

}

export default Hero;
