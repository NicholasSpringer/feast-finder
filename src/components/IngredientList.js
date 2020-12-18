import React, { Component } from "react";
import styles from "./IngredientList.module.css";
import miscStyles from "./misc.module.css";


class IngredientList extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleDelIngredient = this.handleDelIngredient.bind(this);
        this.handleToggleIngredient = this.handleToggleIngredient.bind(this);
    }

    render() {
        var ingredients = this.props.ingredients;
        return (
            <div className={styles["ingredient-list"]}>
                <span className={miscStyles["list-label"]}>Ingredients</span>
                <div className={styles["ingredient-form"]}>
                    <form onSubmit={this.handleAddIngredient}>
                        <input className={styles["ingredient-input"]} type="text" placeholder="e.g. butter" onChange={this.handleChange} value={this.state.text} />
                    </form>
                    <span className={styles["plus-sign"]}>+</span>
                </div>
                <div className={styles["ingredient-grid"]}>
                    {Object.keys(ingredients).map(ingr => (
                        <div key={`${ingr}`} className={`${styles["ingredient-box"]} ${ingredients[ingr].active ? styles["ingredient-active"] : ""}`}
                            onClick={(e) => this.handleToggleIngredient(e, ingr)}>
                            <span>{ingr}</span>
                            <div className={styles["x-button"]} onClick={(e) => this.handleDelIngredient(e, ingr)}>x</div>
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
        this.props.addIngredient(this.state.text.toLowerCase(), true);
        this.setState(state => { return { text: "" } })
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