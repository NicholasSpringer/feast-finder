import React, { Component } from "react";

class RecipeList extends Component {
    render() {
        var recipes = this.props.recipes;
        return (
            <div class="ingredient-list">
                {Object.keys(recipes).filter( // filter by > 1 active ingredient
                    rId => recipes[rId].active.keys.length > 0
                ).sort( // sort by num active ingredients
                    (rId1, rId2) => recipes[rId2].active.keys.length - recipes[rId1].active.keys.length
                ).map( // map to recipe info cards
                    rId => (
                        <div>
                            <h2>{recipes[rId].info.title}</h2>
                            <p>{recipes[rId].info.description}</p>
                            <div>{recipes[rId].ingredients.map(
                                ingr => (
                                    <div class={"ingredient-box" +
                                        `${recipes[rId].ingredients[ingr].selected ? "ingredient-active" : "ingredient-inactive"}`}>
                                        <span>{ingr}</span>
                                    </div>
                                )
                            )}</div>
                        </div>
                    )
                )}
            </div>)
    }
}

export default RecipeList;