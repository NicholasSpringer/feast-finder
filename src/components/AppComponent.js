import React, { Component } from "react";
import RecipeList from "./RecipeList"
import IngredientList from "./IngredientList"
import Login from "./Login"

class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { ingredients: {}, recipes: {}, username: null };
        this.addIngredient = this.addIngredient.bind(this);
        this.toggleIngredient = this.toggleIngredient.bind(this);
        this.delIngredient = this.delIngredient.bind(this);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    // add an ingredient to state
    addIngredient(ingrId, active) {
        fetch(`http://localhost:9000/get-recipes?ingr=${ingrId}`)
            .then(res => res.json()).then(newRecipesInfo => {
                this.setState(state => {
                    let ingredients = { ...state.ingredients };
                    let recipes = { ...state.recipes };
                    for (let recipeId in newRecipesInfo) {
                        var recipe;
                        if (recipeId in recipes) {
                            // copy existing recipe object
                            recipe = { ...recipes[recipeId] }
                        } else {
                            // create new recipe object
                            recipe = { info: newRecipesInfo[recipeId], active: {}, available: {} };
                        }
                        if (active) {
                            recipe.active[ingrId] = true;
                        }
                        recipe.available[ingrId] = true;
                        recipes[recipeId] = recipe;
                    }
                    ingredients[ingrId] = { active: active, recipeIds: Object.keys(newRecipesInfo) };

                    if (state.username != null) {
                        // add ingredient to current account in database
                        fetch("http://localhost:9000/add-ingredients", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username: state.username, ingredients: [ingrId] })
                        });
                    }
                    return { ingredients: ingredients, recipes: recipes };
                });
            });
    }

    // activate or deactivate ingredient
    toggleIngredient(ingrId) {
        this.setState(state => {
            let ingredients = { ...state.ingredients };
            let ingr = { ...ingredients[ingrId] };
            ingr.active = !ingr.active;
            ingredients[ingrId] = ingr;

            let recipes = { ...state.recipes };
            ingr.recipeIds.forEach(recipeId => {
                let recipe = { ...recipes[recipeId] }
                if (ingr.active) {
                    recipe.active[ingrId] = true;
                } else {
                    delete recipe.active[ingrId]
                }
                recipes[recipeId] = recipe;
            });
            return { ingredients: ingredients, recipes: recipes }
        });
    }

    // delete ingredient from state
    delIngredient(ingrId) {
        this.setState(state => {
            let ingredients = { ...state.ingredients };

            let recipes = { ...state.recipes };
            ingredients[ingrId].recipeIds.forEach(recipeId => {
                let recipe = { ...recipes[recipeId] };
                delete recipe.active[ingrId];
                delete recipe.available[ingrId];
                recipes[recipeId] = recipe;
                if (Object.keys(recipe.available).length === 0) {
                    delete recipes[recipeId];
                }
            });
            delete ingredients[ingrId];

            if (state.username != null) {
                fetch("http://localhost:9000/del-ingredient", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: state.username, ingr: ingrId })
                });
            }
            return { ingredients: ingredients, recipes: recipes };
        });
    }

    login(username) {
        this.setState(state => {
            // send current ingredients to database
            fetch("http://localhost:9000/add-ingredients", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { username: username, ingredients: Object.keys(state.ingredients) }
                )
            });
            return { username: username };
        });

        // retrieve previously saved ingredients for user
        fetch(`http://localhost:9000/get-ingredients?username=${username}`)
            .then(res => res.json()).then(val => {
                val.ingredients.forEach(ingrId => {
                    this.addIngredient(ingrId, false);
                });
            });

    }

    logout() {
        this.setState(state => {
            return { ingredients: {}, recipes: {}, username: null };
        });
    }

    render() {
        return (
            <div className="horiz-container" >
                <div className="vert-container">
                    <h2>Feast Finder</h2>
                    <Login username={this.state.username}
                        login={this.login}
                        logout={this.logout}></Login>
                    <IngredientList ingredients={this.state.ingredients}
                        addIngredient={this.addIngredient}
                        toggleIngredient={this.toggleIngredient}
                        delIngredient={this.delIngredient}></IngredientList>
                </div>
            <RecipeList recipes={this.state.recipes}></RecipeList>
            </div>
        )
    }
}

export default AppComponent;