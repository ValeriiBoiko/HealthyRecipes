import Action from '../constants/Action';
import {getRecipes, getRecipe, getInstructions} from '../service';

function setRecipesAction(type, isReady, recipes) {
  return {
    type: Action.SET_RECIPES,
    payload: {
      [type]: {
        isReady: isReady,
        result: recipes,
      },
    },
  };
}

export function addRecipes(config, recipesType) {
  return (dispatch, getState) => {
    const {recipes} = getState();

    if (config.number && config.number > 0) {
      getRecipes(config)
        .then((result) => {
          result = recipes[recipesType]
            ? recipes[recipesType].concat(result)
            : result;
          dispatch({
            type: Action.SET_RECIPES,
            payload: {
              ...recipes,
              [recipesType]: result,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };
}

export function setRecipes(config, recipesType) {
  return (dispatch) => {
    dispatch(setRecipesAction(recipesType, false, []));

    if (config.number && config.number > 0) {
      getRecipes(config)
        .then((result) => {
          dispatch(setRecipesAction(recipesType, true, result));
        })
        .catch((err) => console.log(err));
    }
  };
}

export function setRecipe(id = -1, type) {
  if (!id && id !== 0) {
    return null;
  }

  return (dispatch) => {
    dispatch({
      type: Action.SET_RECIPE,
      payload: {state: 'LOADING'},
    });

    const recipe = getRecipe(id);
    const instructions = getInstructions(id);

    Promise.all([recipe, instructions])
      .then((values) => {
        dispatch({
          type: Action.SET_RECIPE,
          payload: {
            [type]: {
              ...values[0],
              instructions: values[1],
              state: 'READY',
            },
          },
        });
      })
      .catch((err) => console.log(err));
  };
}

export function addToFavorite(recipe) {
  return (dispatch, getState) => {
    const favorites = getState().favorites;

    dispatch({
      type: Action.SET_FAVORITES,
      payload: favorites.concat([recipe]),
    });
  };
}

export function removeFromFavorite(recipeId) {
  return (dispatch, getState) => {
    const favorites = getState().favorites.filter(
      (favorite) => favorite.id !== recipeId,
    );

    dispatch({
      type: Action.SET_FAVORITES,
      payload: favorites,
    });
  };
}

export function addToCart(recipe, ingredient) {
  return (dispatch, getState) => {
    const {cart} = getState();
    const updatedCart = {...cart};

    if (!updatedCart[recipe.id]) {
      updatedCart[recipe.id] = {
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        ingredients: [ingredient],
      };
    } else {
      updatedCart[recipe.id].ingredients = updatedCart[
        recipe.id
      ].ingredients.concat([ingredient]);
    }

    dispatch({
      type: Action.UPDATE_CART,
      payload: updatedCart,
    });
  };
}

export function removeFromCart(recipe, ingredient) {
  return (dispatch, getState) => {
    const {cart} = getState();
    const updatedCart = {...cart};
    const cartRecipe = updatedCart[recipe.id];

    cartRecipe.ingredients = cartRecipe.ingredients.filter(
      (item) => item.id !== ingredient.id,
    );

    if (!cartRecipe.ingredients.length) {
      delete updatedCart[recipe.id];
    }

    dispatch({
      type: Action.UPDATE_CART,
      payload: updatedCart,
    });
  };
}

export function removeRecipeFromCart(recipeId) {
  return (dispatch, getState) => {
    const {cart} = getState();
    const updatedCart = {...cart};

    if (updatedCart[recipeId]) {
      delete updatedCart[recipeId];
    }

    dispatch({
      type: Action.UPDATE_CART,
      payload: updatedCart,
    });
  };
}
