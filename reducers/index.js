import Action from "../constants/Action";

const initialState = {
  recipes: [],
  favorites: [],
  cart: [],
  recipe: {}
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
    case Action.UPDATE_CART:
      return {
        ...state,
        cart: action.payload
      }
  }

  return state;
}