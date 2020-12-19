import React, { Component } from "react";
import RecipeList from "./RecipeList";
import IngredientList from "./IngredientList";
import Login from "./Login";
import logo from "../logo.svg";
import styles from "./AppComponent.module.css";

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
        fetch(`${location.protocol}//${process.env.API_HOST}/get-recipes?ingr=${ingrId}`)
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
                        fetch(`${location.protocol}//${process.env.API_HOST}/add-ingredients`, {
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
                fetch(`${location.protocol}//${process.env.API_HOST}/del-ingredient`, {
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
            fetch(`${location.protocol}//${process.env.API_HOST}/add-ingredients`, {
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
        fetch(`${location.protocol}//${process.env.API_HOST}/get-ingredients?username=${username}`)
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
            <div className={styles["overall-vert"]}>
                <div className={styles["banner"]}>
                    <img className={styles["logo"]} src={logo} alt="Logo"></img>
                    <div className={styles["login-div"]}>
                        <Login username={this.state.username}
                            login={this.login}
                            logout={this.logout}></Login>
                    </div>
                </div>
                <div className={styles["center"]}>
                    <div className={styles["ingr-panel"]}>
                        <IngredientList ingredients={this.state.ingredients}
                            addIngredient={this.addIngredient}
                            toggleIngredient={this.toggleIngredient}
                            delIngredient={this.delIngredient}></IngredientList>
                    </div>
                    <div className={styles["center-divider"]}></div>
                    <div className={styles["recipe-panel"]}>
                        <RecipeList recipes={this.state.recipes}
                            ingredients={this.state.ingredients}></RecipeList>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppComponent;