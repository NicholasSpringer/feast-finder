import React, { Component } from "react";

class IngredientList extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleDelIngredient = this.handleDelIngredient.bind(this);
        this.handleToggleIngredient = this.handleToggleIngredient.bind(this);
    }

    render() {
        var ingredients = this.props.ingredients;
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleAddIngredient}>
                    <label>Add Ingredient:</label>
                    <input type="text" placeholder="e.g. butter" onChange={this.handleChange} value={this.state.text} />
                    <button type="submit">Add</button>
                </form>
                <div className="ingredient-grid">
                    {Object.keys(ingredients).map(ingr => (
                        <div key={`${ingr}`} className={`ingredient-box ${ingredients[ingr].active ? "ingredient-active" : ""}`}
                            onClick={(e) => this.handleToggleIngredient(e, ingr)}>
                            <span>{ingr}</span>
                            <div className="x-button" onClick={(e) => this.handleDelIngredient(e, ingr)}>x</div>
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
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        this.props.addIngredient(this.state.text, true);
        this.setState(state => {return {text: ""}})
    }

    handleToggleIngredient(e, ingr) {
        this.props.toggleIngredient(ingr);
    }

    handleDelIngredient(e, ingr) {
        e.stopPropagation();
        this.props.delIngredient(ingr);
    }
}

export default IngredientList;