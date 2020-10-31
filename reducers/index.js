import Action from "../constants/Action";
import { LightTheme } from "../constants/Design";

const initialState = {
  recipes: [],
  favorites: [],
  cart: [],
  recipe: {},
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
        recipe: action.payload
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

  }

  return state;
}