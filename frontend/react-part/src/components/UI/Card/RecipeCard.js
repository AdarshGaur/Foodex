import React from 'react';
import img5 from "../../../images/img-5.jpg"
import {Card, Button} from 'react-bootstrap'


function Recipecard(){
return(
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={img5}/>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
)
}

export default Recipecard;