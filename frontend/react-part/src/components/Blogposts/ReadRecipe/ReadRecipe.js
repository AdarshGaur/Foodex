import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './ReadRecipe.module.css';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'


class AddRecipe extends Component {

    render(){
        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.readrecipe}>
                    <span className={classes.tags}>Drinks and Smoothies</span>
                    <span className={classes.tags}>Vegetarian</span>
                <h1>Butter Paneer</h1>
                <div className={classes.options}>
                <p>by Henry Cavillary</p>
                <p>Cooking Time: mins</p>
                </div>
                <div className={classes.imgwrap}>
                <img  className={classes.foodimg} src="https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-500x500.jpg" />
                </div>
                <h2 className={classes.foodhead}>Ingredients</h2>
                <h5>Tomato, Onion, Paneer, Pickle, Garlic, Butter, Masala, Cashews, Pickle, Ginger, Wheat.</h5>
                <h2 className={classes.foodhead}>Instructions</h2>
                <h5 className={classes.recipe}>
                In a large pan or kadhai, heat a tablespoon of butter and a tablespoon of oil.
                Add red chillies, ginger, garlic paste and all the whole spices (bay leaves, cinnamon, cloves, cardamom and peppercorns). Alternatively, you can also wrap the spices in a muslin cloth and add them to the pan (take this out after the tomatoes are cooked down). Saute for a minute or two and add cashew nuts, poppy seeds (if using) and onions. Once the onions turn translucent, add the tomatoes. Mix well
                </h5>

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









