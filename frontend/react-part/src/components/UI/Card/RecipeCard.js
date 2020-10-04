import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import classes from './RecipeCard.module.css'


const RecipeCard = (props) => {
 return(
      <Card style={{ width: "18rem" }} className={classes.box} index={props.pk}>
        <Card.Img variant="top" height="250px" src="holder.js/100px180" src= {props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.content.substring(0, 50)}...</Card.Text>
          <Button className={classes.pinkbtn} as={Link} 
           to= {{
            pathname:'/read-recipe',
            state:{recipeid: props.pk}
          }} 
          >Read More</Button>
        </Card.Body>
      </Card>
)
};



export default RecipeCard;

