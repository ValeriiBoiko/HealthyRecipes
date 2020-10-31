import Action from "../constants/Action";
import { getRecipes, getRecipe } from "../service";

export function updateRecipes(number = 0, offset = 0) {
  return (dispatch, getState) => {
    const recipes = getState().recipes;

    getRecipes({
      number,
      offset
    })
      .then((result) => {
        dispatch({
          type: Action.SET_RECIPES,
          payload: recipes.concat(result)
        })
      })
      .catch((err) => console.log(err))
  }
}

export function setRecipe(id = -1) {
  if (id === -1) return null;

  return (dispatch) => {
    dispatch({
      type: Action.SET_RECIPE,
      payload: { state: 'LOADING' }
    })

    getRecipe(id)
      .then((recipe) => {
        recipe.state = 'READY';
        dispatch({
          type: Action.SET_RECIPE,
          payload: recipe
        })
      })
      .catch((err) => console.log(err))
  }
}

export function toggleFavorite(recipe) {
  if (id === -1) return null;

  return (dispatch, getState) => {
    const favorites = getState().favorites;


    // dispatch({
    //   type: Action.SET_RECIPE,
    //   payload: recipes.concat(result)
    // })
  }
}

export function addToCart(recipeId, ingredientId) {
  return (dispatch, getState) => {
    const { recipes, cart } = getState();
    const recipe = recipes.findIndex((item) => item.id === recipeId);
    const ingredient = recipe.ingredients.findIndex((item) => item.id === ingredientId);

    console.log(recipe);
    console.log(ingredient);

  }

}