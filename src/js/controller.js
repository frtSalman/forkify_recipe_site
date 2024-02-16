import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/BookmarkView.js';

// import 'core-js/stable'; // to polyfilling for old browsers
// import 'regenerator-runtime/runtime'; // to polyfilling async/await
// import { async } from 'regenerator-runtime';
/////////////////////////////////////
//Bu kod parcel.js den gelir sayfanın tekrar tekrar yüklenmesini engeller.
// if (module.hot) {
//   module.hot.accept();
// }
////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Alltaki kod sitenin urlsinden hash'ı çeker
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Update the searchView to mark selected result
    searchView.update(model.getSearchResultPage());
    // Update BOOKMARKS
    bookmarkView.render(model.state.bookmark);
    // Loading Recipe
    await model.loadRecipe(id);
    // Render Recipe
    recipeView.render(model.state.recipe);
    // controlServings(); // for test
  } catch (err) {
    recipeView.renderError();
    bookmarkView.renderError();
  }
};

const controlSearch = async function () {
  try {
    // Get search word
    const searchWord = searchView.takeSearchİnput();
    if (!searchWord) return;
    // Clear search log
    searchView.clearSearchInput();
    searchView.renderSpinner();
    // Load search results
    await model.loadSearch(searchWord);
    // for go back to page 1 after each search
    model.state.searchResults.page = 1;
    // Render search results
    searchView.render(model.getSearchResultPage());
    // pagination
    paginationView.render(model.state.searchResults);
  } catch (err) {
    searchView.renderError();
  }
};

const controlPagination = function (goTo) {
  // Render new search results
  searchView.render(model.getSearchResultPage(goTo));
  // new pagination
  paginationView.render(model.state.searchResults);
};

const controlServings = function (newServings) {
  // Update recipe servings;
  model.updateServings(newServings);
  // Update recipe view;
  // recipeView.render(model.state.recipe);
  // Sadece gerekli yerleri yeniliyecek ve bütün sayfayı tekrar yüklenmesine negel olacacak bir update methodu lazım.
  recipeView.update(model.state.recipe); // gibi
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmark);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerRender(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};

init();
