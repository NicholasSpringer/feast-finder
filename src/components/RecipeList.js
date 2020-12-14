import React, { Component } from "react";
import styles from "./RecipeList.module.css"
import ingrStyles from "./IngredientList.module.css"

class RecipeList extends Component {
    render() {
        var recipes = this.props.recipes;
        return (
            <div className={styles["recipe-list"]}>
                {Object.keys(recipes).filter( // filter by > 1 active ingredient
                    rId => Object.keys(recipes[rId].active).length > 0
                ).sort( // sort by num active ingredients
                    (rId1, rId2) => Object.keys(recipes[rId2].active).length
                        - Object.keys(recipes[rId1].active).length
                ).map( // map to recipe info cards
                    rId => (
                        <div className={styles["recipe-box"]} key={`${rId}`}>
                            <div className={styles["recipe-title-banner"]}>
                            <div className={styles["recipe-title"]}>{recipes[rId].info.title}</div>
                            </div>
                            <p>{recipes[rId].info.description}</p>
                            <div className={styles["recipe-ingr-list"]}>{recipes[rId].info.ingredients.map(
                                ingr => (
                                    <span key={`${ingr}`} className={`${ingrStyles["ingredient-box"]} ${ingr in recipes[rId].active ? ingrStyles["ingredient-active"] : ""}`}>
                                        {ingr}
                                    </span>
                                )
                            )}</div>
                        </div>
                    )
                )}
            </div>)
    }
}

export default RecipeList;