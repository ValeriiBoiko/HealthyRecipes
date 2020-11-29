import Action from '../constants/Action';
import {
  addRecipes,
  addToCart,
  addToFavorite,
  removeFromCart,
  removeFromFavorite,
  removeRecipeFromCart,
  setRecipe,
  setRecipes,
} from '../middleware';

jest.mock('../service', () => ({
  getRecipes: () => Promise.resolve([{id: 1, title: 'foo'}]),
  getRecipe: () => Promise.resolve({id: 1, title: 'foo'}),
  getInstructions: () => Promise.resolve([]),
}));

describe('test actions', () => {
  it.each([
    [
      'cart',
      {
        cart: [
          {id: 0, title: 'bar'},
          {id: 1, title: 'foo'},
        ],
      },
    ],
    [
      'favorites',
      {
        cart: [
          {
            id: 0,
            title: 'bar',
          },
        ],
        favorites: [
          {
            id: 1,
            title: 'foo',
          },
        ],
      },
    ],
  ])(
    'addRecipes action should dispatch SET_RECIPES action with correct payload',
    async (type, payload) => {
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({
        recipes: {
          cart: [
            {
              id: 0,
              title: 'bar',
            },
          ],
        },
      });

      await addRecipes({number: 1}, type)(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: Action.SET_RECIPES,
        payload: payload,
      });
    },
  );

  it('setRecipes action should replace existing recipes', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({
      recipes: {
        cart: [
          {
            id: 123,
          },
        ],
      },
    });

    await setRecipes({number: 1}, 'cart')(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: Action.SET_RECIPES,
      payload: {
        cart: [
          {
            id: 1,
            title: 'foo',
          },
        ],
      },
    });
  });

  it('setRecipe action should replace existing recipe for specified recipes type', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({recipe: {}});

    await setRecipe(1, 'cart')(dispatch, getState);

    expect(dispatch.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: Action.SET_RECIPE,
        payload: {
          state: 'LOADING',
        },
      }),
    );
    expect(dispatch.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        payload: {
          cart: {
            id: 1,
            title: 'foo',
            instructions: [],
            state: 'READY',
          },
        },
        type: Action.SET_RECIPE,
      }),
    );
  });

  it.each([
    ['123', {}],
    [
      '321',
      {
        123: {
          ingredients: [],
        },
      },
    ],
    [
      undefined,
      {
        123: {
          ingredients: [],
        },
      },
    ],
  ])(
    'removeRecipeFromCart action should delete the recipe from cart by id',
    async (id, payload) => {
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({
        cart: {
          123: {ingredients: []},
        },
      });

      await removeRecipeFromCart(id)(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: Action.UPDATE_CART,
        payload: payload,
      });
    },
  );

  it.each([
    [{id: 123}, {id: 0}, {123: {ingredients: [{id: 1}]}}],
    [{id: 123}, {id: 1}, {123: {ingredients: [{id: 0}]}}],
  ])(
    'removeFromCart action should delete ingredient from cart',
    async (recipe, ingredient, payload) => {
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({
        cart: {
          123: {ingredients: [{id: 0}, {id: 1}]},
        },
      });

      await removeFromCart(recipe, ingredient)(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: Action.UPDATE_CART,
        payload: payload,
      });
    },
  );

  it('removeFromCart action should delete recipe if the last ingredient is deleted', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({
      cart: {
        123: {ingredients: [{id: 0}]},
      },
    });

    await removeFromCart({id: 123}, {id: 0})(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: Action.UPDATE_CART,
      payload: {},
    });
  });

  it('addToCart action should add new recipe and ingredient if there is no recipe in the cart', async () => {
    const recipe = {
      id: 123,
      image: 'image://path',
      title: 'recipeTitle',
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({cart: {}});

    await addToCart(recipe, {id: 0})(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: Action.UPDATE_CART,
      payload: {
        123: {
          ...recipe,
          ingredients: [{id: 0}],
        },
      },
    });
  });

  it('addToCart action should add ingredient to existing recipe in the cart', async () => {
    const recipe = {
      id: 123,
      image: 'image://path',
      title: 'recipeTitle',
      ingredients: [{id: 0}],
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({
      cart: {
        123: recipe,
      },
    });

    await addToCart(recipe, {id: 1})(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: Action.UPDATE_CART,
      payload: {
        123: {
          ...recipe,
          ingredients: [{id: 0}, {id: 1}],
        },
      },
    });
  });

  it.each([
    [123, []],
    [321, [{id: 123}]],
    [321, [{id: 123}], [{id: 123}, {id: 321}]],
  ])(
    'removeFromFavorite action should delete recipe from favorites',
    async (id, payload, init = [{id: 123}]) => {
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({favorites: init});

      await removeFromFavorite(id)(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: Action.SET_FAVORITES,
        payload: payload,
      });
    },
  );

  it.each([
    [{id: 123}, [{id: 123}]],
    [{id: 321}, [{id: 123}, {id: 321}], [{id: 123}]],
  ])(
    'addToFavorite action should add recipe to favorites',
    async (recipe, payload, init = []) => {
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce({favorites: init});

      await addToFavorite(recipe)(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: Action.SET_FAVORITES,
        payload: payload,
      });
    },
  );
});
