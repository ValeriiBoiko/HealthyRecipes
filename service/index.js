const key = '05c8053849544c2cbd4e93584ad9aafc';

export function getRecipes(config) {
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}`;
  let query = '';

  for (let param in config) {
    let value = config[param];

    if (Array.isArray(value)) {
      value = value.join(',+');
    }

    if (value !== null && value !== undefined) {
      query += `${param}=${value}&`;
    }
  }

  if (query.length) {
    url = url + '&' + query;
  }

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => resolve(json.results))
      .catch(() => resolve([]));
  });
}

export function getRecipe(id) {
  let recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;

  return new Promise((resolve, reject) => {
    fetch(recipeUrl)
      .then((resp) => resp.json())
      .then((rawRecipe) => {
        resolve({
          id: rawRecipe.id,
          title: rawRecipe.title,
          image: rawRecipe.image,
          servings: rawRecipe.servings,
          readyInMinutes: rawRecipe.readyInMinutes,
          sourceName: rawRecipe.sourceName,
          summary: rawRecipe.summary,
          aggregateLikes: rawRecipe.aggregateLikes,
          ingredients: rawRecipe.extendedIngredients
            ? rawRecipe.extendedIngredients.map((item) => ({
                id: item.id,
                title: item.original,
              }))
            : [],
        });
      })
      .catch((err) => reject(err));
  });
}

export function getInstructions(recipeId) {
  let instructionUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions/?apiKey=${key}`;

  return new Promise((resolve, reject) => {
    fetch(instructionUrl)
      .then((resp) => resp.json())
      .then((resp) => {
        const result = [];

        resp.forEach((instruction) => {
          instruction.steps.forEach((step) => {
            result.push(step.step);
          });
        });

        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
