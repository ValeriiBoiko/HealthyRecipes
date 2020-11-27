import Action from "../constants/Action";
import { LightTheme } from "../constants/Design";

const initialState = {
  recipes: {
    searchRecipes: [],
    categoryRecipes: []
  },
  favorites: [],
  cart: {},
  recipe: {
    cart: {},
    favorites: {},
    searchRecipes: {},
    categoryRecipes: {},
  },
  theme: LightTheme
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Action.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case Action.SET_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ...action.payload
        }
      }
    case Action.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }
    case Action.SET_THEME:
      return {
        ...state,
        theme: action.payload
      }
    case Action.UPDATE_CART:
      return {
        ...state,
        cart: action.payload
      }

  }

  return state;
}