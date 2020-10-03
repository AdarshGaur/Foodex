import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './ReadRecipe.module.css';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import LikeButton from '../../UI/LikeButton/LikeButton';
import BookmarkButton from '../../UI/BookmarkButton/BookmarkButton';
import axios from 'axios';
import serverService from '../../../services/serverService';

class AddRecipe extends Component {
    state = {
        isLoading: true,
        recipe: [],
        error: null,
        // text: '  or kadhai, heat a tablespoon of butter and a tablespoon of oil'
        
      }
    
      componentDidMount(){
          const data= this.props.location.state.recipeid;
        // axios.get('http://af3c2d386213.ngrok.io/recipe/'+this.props.location.state.recipeid+'/')
        serverService.readrecipe(data)
        .then(response=>{
          console.log(response);
          this.setState({recipe: response.data})
        })
      }

    render(){
        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.readrecipe}>
                    <span className={classes.tags}>Drinks and Smoothies</span>
                    <span className={classes.tags}>Vegetarian</span>
                <h1>{this.state.recipe.title}</h1>
                {/* <h1>Butter Paneer</h1> */}
                <div className={classes.options}>
                <p>by {this.state.recipe.owner}</p>
        <p>Cooking Time: {this.state.recipe.cook_time} mins</p>
                </div>
                <div className={classes.imgwrap}>
                <img  className={classes.foodimg} 
                src={this.state.recipe.img_url}
                // src="https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-500x500.jpg" 
                
                />
                </div>
                <h2 className={classes.foodhead}>Ingredients</h2>
                <h5>
                    {/* Tomato, Onion, Paneer, Pickle, Garlic, Butter, Masala, Cashews, Pickle, Ginger, Wheat. */}
                    {this.state.recipe.ingredients}
                </h5>
                <h2 className={classes.foodhead}>Instructions</h2>
                <h5 className={classes.recipe}>
                {/* or kadhai, heat a tablespoon of butter and a tablespoon of oil.
                Add red chillies, ginger, garlic paste and all the whole spices (bay leaves, cinnamon, cloves, cardamom and peppercorns). Alternatively, you can also wrap the spices in a muslin cloth and add them to the pan (take this out after the tomatoes are cooked down). Saute for a minute or two and add cashew nuts, poppy seeds (if using) and onions. Once the onions turn translucent, add the tomatoes. Mix well */}
              
            {/* {this.state.text} */}

                {this.state.recipe.content}
                </h5>

                <LikeButton pk={this.props.location.state.recipeid} />
                <BookmarkButton pk={this.props.location.state.recipeid} />

                <h2>Drop a Suggestion</h2>
                <textarea rows="10" className={classes.area} name = 'instructions'  placeholder={this.state.instructions} onChange = {this.handlechangeall} />

                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header>Quick Tips</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                <Card.Text>
                <ul>
                <li>Write a good, catchy title</li>
                <li>Give clear details about your recipe preparation</li>
                <li>Add a relevant topic to reach the right members</li>
                <li>Check your spelling and grammar</li>
                <li>Become an active member to get recognized</li>
                </ul>
                </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </div>
            </>
        );
    }
}

export default AddRecipe;









