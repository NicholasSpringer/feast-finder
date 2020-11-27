import React, { Component } from "react";

class RecipeList extends Component {
    render() {
        var recipes = this.props.recipes;
        return (
            <div className="recipe-list">
                {Object.keys(recipes).filter( // filter by > 1 active ingredient
                    rId => Object.keys(recipes[rId].active).length > 0
                ).sort( // sort by num active ingredients
                    (rId1, rId2) => Object.keys(recipes[rId2].active).length
                        - Object.keys(recipes[rId1].active).length
                ).map( // map to recipe info cards
                    rId => (
                        <div className="recipe-box" key={`${rId}`}>
                            <h2>{recipes[rId].info.title}</h2>
                            <p>{recipes[rId].info.description}</p>
                            <div className="recipe-ingr-list">{recipes[rId].info.ingredients.map(
                                ingr => (
                                    <span key={`${ingr}`} className={`recipe-ingr-box ${ingr in recipes[rId].active ? "recipe-ingr-active" : ""}`}>
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