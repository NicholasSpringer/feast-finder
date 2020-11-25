import React, { Component } from "react";

class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { ingrGraph: {}, recipes: {}, username: null };
        this.addIngredient = this.addIngredient.bind(this)
        this.setIngredient = this.setIngredient.bind(this)
        this.delIngredient = this.delIngredient.bind(this)

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    addIngredient(ingr) {
        if (ingr in this.state.ingrGraph) {
            return;
        }

        this.state.ingrGraph[ingr] = {selected: true, recipes: []}

        fetch("http://localhost:9000")
            .then(res => 
                {for (recipe_id in res.body) {
                    if (recipe_id in this.state.recipes) {
                        // update existing recipe object
                        this.state.recipes[recipe_id].active[ingr] = true
                    } else {
                        // create new recipe object, populate active ingredients
                        var recipe;
                        recipe = {info: res.body[recipe], active: {}}
                        recipe.active[ingr] = true
                        for (other_ingr in ingrGraph) {
                            if (other_ingr in recipe.info.required) {
                                recipe.active[other_ingr] = true
                                ingrGraph[other_ingr].recipes.append(recipe_id)
                            }
                        }
                        this.state.recipes[recipe_id] = recipe
                    }
                }})
    }

    addRecipe(recipe) {

    }

    setIngredient(ingr, selected) {
        this.state.ingrGraph[ingr].selected = selected
    }

    delIngredient(ingr) {
        delete this.state.ingrGraph[ingr]
    }

    login(username) {
        this.state.username = username
    }

    logout() {
        this.state.username = null
    }

    render() {
        return (
            <div class = "horiz-container">
                <div class = "vert-container">
                    <Login  username={this.state.username}
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