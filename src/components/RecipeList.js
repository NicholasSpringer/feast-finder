import React, { Component } from "react";

class RecipeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class = "ingredient-list">
                {this.props.recipes.keys().filter( // filter by > 1 active ingredient
                    rId => recipes[rId].active.keys.length > 0
                ).sort( // sort by num active ingredients
                    rId1, rId2 => recipes[rId2].active.keys.length - recipes[rId1].active.keys.length
                ).map( // map to recipe info cards
                    rId => (
                        <div>
                            <h2>{recipes[rId].info.title}</h2>
                            <p>{recipes[rId].info.description}</p>
                            <div>
                                {recipes[rId].ingredients.map(
                                    i => (
                                        <div class={`ingredient-box ${ingredients[ingr].selected ? "ingredient-active" : "ingredient-inactive"}`}>
                                            <span>{ingr}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>)
    }
}

export default RecipeList;