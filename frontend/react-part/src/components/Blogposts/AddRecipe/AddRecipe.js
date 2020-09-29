import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './AddRecipe.module.css';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'


class AddRecipe extends Component {

    state = { 
    title:"",
    titleLimit:50,
    ingredients:"",
    ingredientsLimit: 100,
    instructions:"",
    instructionsLimit:2500,
    category:"starters",
    label:"veg"
  }

    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }   
    
    // dropdownChangeHandler=(e)=>{
    //     this.setState({value})
    // }

    render(){
        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.addrecipe}>
                <h1>Share Your Recipe</h1>
                
                

        <form onSubmit = {this.handleOnSubmit}>

            <label className={classes.labels}><h3>Recipe Title</h3></label>
            <input type="text" className={classes.area} name = 'title'  placeholder={this.state.title} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.title.length}/{this.state.titleLimit}</p>
            <label ><h3>Ingredients</h3></label>
            <input type="text" className={classes.area} name = 'ingredients'  placeholder={this.state.ingredients} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.ingredients.length}/{this.state.ingredientsLimit}</p>
            <label ><h3>Instructions</h3></label>
            <textarea rows="10" className={classes.area} name = 'instructions'  placeholder={this.state.instructions} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.instructions.length}/{this.state.instructionsLimit}</p>
            <label><h3>Category</h3></label>
            <select name='category' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="starters">Starters</option>
            <option value="maincourse">Main Course</option>
            <option value="deserts">Deserts</option>
            <option value="drink">Drinks and Smoothies</option>
            </select>

            <label><h3>Label</h3></label>
            <select name='label' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
            </select>
            

        </form>

                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header>Quick Tips</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                <Card.Text>
                <ul>
                <li>Write a good, catchy title</li>
                <li>Give clear details about your question</li>
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









