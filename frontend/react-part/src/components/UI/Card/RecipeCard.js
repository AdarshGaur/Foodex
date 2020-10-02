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
          <Card.Text>{props.content.substring(0, 150)}...</Card.Text>
          <Button variant="primary" as={Link} 
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









// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// },
// {
//   image: "https://i.insider.com/50f967f56bb3f7830a000019",
//   title: "Lebron James",
//   text: "THE GOAT",
// },
// {
//   image:
//     "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
//   title: "Alex Caruso",
//   text: "THE TRUE GOAT",
// },
// {
//   image:
//     "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
//   title: "Steph Curry",
//   text: "he good",
// },
// {
//   image:
//     "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
//   title: "Michael Jordan",
//   text: "he is very close to goat",
// }
// ];