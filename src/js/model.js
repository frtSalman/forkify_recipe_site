// Vieverlara gönderilecek datalar burda şekillenmelidir.
// import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { getJSON } from './helper.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  searchResults: {
    query: '',
    page: 1,
    resultsPerPages: RES_PER_PAGE,
  },
  bookmark: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmark.some(bookmark => bookmark.id === recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async function (searchWord) {
  try {
    const data = await getJSON(
      `${API_URL}?search=${searchWord}&key=${API_KEY}`
    );
    if (data.results === 0) return new Error();
    state.searchResults.query = data.data.recipes;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.searchResults.page) {
  state.searchResults.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.searchResults.query.slice(start, end);
};

export const updateServings = function (newServings = state.recipe.servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmark.push(recipe);
  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
