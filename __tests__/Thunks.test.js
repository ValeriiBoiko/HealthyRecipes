import Action from "../constants/Action";
import { addRecipes } from "../middleware";

jest.mock('../service', () => ({
  getRecipes: () => Promise.resolve([{ id: 1, title: 'foo' }])
}))

describe('test thunk Actions', () => {
  it('addRecipes action should dispatch SET_RECIPES action', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValueOnce({
      recipes: {
        cart: [{ id: 0, title: 'bar' }]
      }
    });

    await addRecipes({ number: 1 }, 'cart')(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1)

    expect(dispatch).toBeCalledWith({
      type: Action.SET_RECIPES,
      payload: {
        cart: [
          { id: 0, title: 'bar' },
          { id: 1, title: 'foo' }
        ]
      }
    })
  })
})