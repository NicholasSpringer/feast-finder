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
        this.state.ingrGraph[ingr] = {selected: true, recipes: []}
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
                            logout={this.logout}>
                    </Login>
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