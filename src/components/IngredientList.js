import React, { Component } from "react";

class IngredientList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form class="form-inline" onSubmit={this.handleAddIngredient}>
                    <label>Add Ingredient:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.text} />
                    <button type="submit">Add</button>
                </form>
                <div class="ingredient-grid">
                    {this.props.ingredients.keys().map(ingrId => (
                        <div class={`ingredient-box ${ingredients[ingr].selected ? "ingredient-active" : "ingredient-inactive"}`}
                            onClick={(e) => this.handleToggleIngredient(e, ingr)}>
                            <span>{ingr}</span>
                            <button onClick={(e) => this.handleDelIngredient(e, ingr)}></button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleAddIngredient(e) {
        if (this.state.text.length === 0) {
            return;
        }
        this.props.addIngredient(this.state.text);
    }

    handleToggleIngredient(e, ingrId) {
        this.props.toggleIngredient(ingrId);
    }

    handleDelIngredient(e, ingrId) {
        e.stopPropogation();
        this.props.delIngredient(ingrId);
    }
}

export default IngredientList;