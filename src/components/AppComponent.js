import React, { Component } from "react";

class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { ingredients: {}, recipes: {}, username: null };
        this.addIngredient = this.addIngredient.bind(this);
        this.setIngredient = this.setIngredient.bind(this);
        this.delIngredient = this.delIngredient.bind(this);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    // TODO - add comments for each function
    activateRecipeIngr(recipeId, ingrId) {
        this.state.recipes[recipeId].active[ingrId] = true;
        this.state.recipes[recipeId].available[ingrId] = true;
    }

    deactivateRecipeIngr(recipeId, ingrId) {
        delete this.state.recipes[recipeId].active[ingrId];
    }

    delRecipeIngr(recipeId, ingrId) {
        delete this.state.recipes[recipeId].active[ingrId];
        delete this.state.recipes[recipeId].available[ingrId];
        if (this.state.recipes[recipeId].available.keys().length === 0) {
            // no more available ingredients in this recipe
            delete this.state.recipes[recipeId];
        }
    }

    addIngredient(ingrId) {
        if (ingrId in this.state.ingredients) {
            return;
        }

        this.state.ingredients[ingrId] = { active: true, recipes: [] };

        fetch("http://localhost:9000")
            .then(res => {
                recipeInfo = res.json();
                for (recipeId in recipeInfo) {
                    if (recipeId in this.state.recipes) {
                        // update existing recipe object
                        this.activateRecipeIngr(recipeId, ingrId);
                    } else {
                        // create new recipe object, add current ingredient to active
                        this.state.recipes[recipeId] = { info: recipeInfo[recipe], active: {}, available: {} };
                        this.activateRecipeIngr(recipeId, ingrId);
                    }
                }
                this.state.ingredients[ingrId].recipes = res.json().keys();
            });
        // TODO - post to server new ingredient if username is set
    }

    toggleIngredient(ingrId) {
        var ingr = this.state.ingredients[ingrId];
        ingr.active = !ingr.active;
        if (ingr.active) {
            for (recipeId in ingr.recipeIds) {
                this.activateRecipeIngr(recipeId, ingrId);
            }
        } else {
            for (recipeId in ingr.recipeIds) {
                this.deactivateRecipeIngr(recipeId, ingrId);
            }
        }
    }

    delIngredient(ingrId) {
        var ingr = this.state.ingredients[ingrId];
        for (recipeId in ingr.recipeIds) {
            this.delRecipeIngr(recipeId, ingrId);
        }
        delete this.state.ingredients[ingrId];
        // TODO - post to server that ingredient is deleted if username is set
    }

    login(username) {
        this.state.username = username
        // TODO - query ingredient list from server and merge with current ingredients,
        // post to server new ingredients
    }

    logout() {
        this.state.username = null
    }

    render() {
        return (
            <div class="horiz-container">
                <div class="vert-container">
                    <Login username={this.state.username}
                        login={this.login}
                        logout={this.logout}></Login>
                    <IngredientList ingredients={this.state.ingredients}
                        addIngredient={this.addIngredient}
                        setIngredient={this.setIngredient}
                        delIngredient={this.delIngredient}></IngredientList>
                </div>
                <RecipeList recipes={this.state.recipes}></RecipeList>
            </div>
        )
    }
}

export default AppComponent;