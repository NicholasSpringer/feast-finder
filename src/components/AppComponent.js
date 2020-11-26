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

    // add an ingredient to the active and available sets for a recipe
    activateRecipeIngr(state, recipeId, ingr) {
        state.recipes[recipeId].active[ingr] = true;
        state.recipes[recipeId].available[ingr] = true;
    }

    // remove an ingredient from active set for a recipe
    deactivateRecipeIngr(state, recipeId, ingr) {
        delete state.recipes[recipeId].active[ingr];
    }

    // remove an ingredient from active and available sets for a recipe
    delRecipeIngr(state, recipeId, ingr) {
        delete state.recipes[recipeId].active[ingr];
        delete state.recipes[recipeId].available[ingr];
        if (Object.keys(state.recipes[recipeId].available).length === 0) {
            delete state.recipes[recipeId];
        }
    }

    // add an ingredient to state
    addIngredient(ingr) {
        fetch(`http://localhost:9000/get-recipes?ingr=${ingr}`)
            .then(res => {
                var recipeInfo = res.json();
                this.setState(state => {
                    for (var recipeId in recipeInfo) {
                        if (recipeId in state.recipes) {
                            // update existing recipe object
                            this.activateRecipeIngr(state, recipeId, ingr);
                        } else {
                            // create new recipe object, add current ingredient to active
                            state.recipes[recipeId] = { info: recipeInfo[recipeId], active: {}, available: {} };
                            this.activateRecipeIngr(state, recipeId, ingr);
                        }
                    }
                    state.ingredients[ingr] = { active: true, recipes: Object.keys(recipeInfo) };
                    if (state.username != null) {
                        fetch("http://localhost:9000/add-ingredients", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username: state.username, ingredients: [ingr] })
                        });
                    }
                    return state;
                });
            });
    }

    // activate or deactivate ingredient
    toggleIngredient(ingrId) {
        this.setState(state => {
            var ingr = state.ingredients[ingrId];
            ingr.active = !ingr.active;
            if (ingr.active) {
                for (var recipeId in ingr.recipeIds) {
                    this.activateRecipeIngr(state, recipeId, ingrId);
                }
            } else {
                for (recipeId in ingr.recipeIds) {
                    this.deactivateRecipeIngr(state, recipeId, ingrId);
                }
            }
            return state
        });
    }

    // delete ingredient from state
    delIngredient(ingrId) {
        this.setState(state => {
            var ingr = state.ingredients[ingrId];
            for (var recipeId in ingr.recipeIds) {
                this.delRecipeIngr(state, recipeId, ingrId);
            }
            delete state.ingredients[ingr];
            if (state.username != null) {
                fetch("http://localhost:9000/del-ingredient", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: state.username, ingr: ingrId })
                });
            }
            return { ingredients: {}, recipes: {}, username: null };
        });
    }

    login(username) {
        console.log("login start")
        this.setState(state => {
            console.log("setting username")
            state.username = username;
            fetch("http://localhost:9000/add-ingredients", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { username: username, ingredients: Object.keys(state.ingredients) }
                )
            });
            console.log("done with fetch")
            return state;
        });
        
        fetch(`http://localhost:9000/get-ingredients?username=${username}`)
            .then(res => {
                let ingredients = res.json().ingredients
                console.log(ingredients)
                this.setState(state => {
                    console.log("setting ingredients")
                    for (var ingr in ingredients) {
                        this.addIngredient(state, ingr);
                        this.toggleIngredient(state, ingr);
                    }
                    return state;
                });
            });

    }

    logout() {
        this.setState(state => {
            state.username = null;
        });
    }

    render() {
        return (
            <div className="horiz-container" >
                <div className="vert-container">
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