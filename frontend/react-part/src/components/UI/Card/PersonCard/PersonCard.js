import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import classes from './PersonCard.module.css'

const PersonCard = () => {
    return(
        <div className={classes.persongrid}>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body><img className={classes.personimg}
  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"/>
    <span img className={classes.usrname}>MS Dhoni <button className={classes.checkprofilebtn}>Check Profile</button></span></Card.Body>
</Card>
</div>
   )
   };
   
   
   
   export default PersonCard;
   