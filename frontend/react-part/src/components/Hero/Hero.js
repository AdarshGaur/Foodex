import classes from './Hero.module.css';
import React from 'react';
import video from '../../videos/video.mp4';


function Hero(){
    return(
<div className={classes.herocontainer}>

<video autoPlay loop muted>
  <source src={video} type="video/mp4" />
</video>

<h1>FOODEX</h1>
<p>Hunger Is Good!</p>

</div>
)

}

export default Hero;
