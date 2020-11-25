import React, { Component } from "react";

class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { ingrGraph: {}, recipes: {}, username: null };
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

    render() {
        if(this.state.username == null) {
            return ()
        }
        return (
            <div>
                <IngredientList items={this.state.ingredients} 
                                addIngredient={this.addIngredient}
                                setIngredient={this.setIngredient}
                                delIngredient={this.delIngredient}></IngredientList>
            </div>
        )
    }
}

export default MyClassComponent;