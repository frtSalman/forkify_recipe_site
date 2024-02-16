import View from './View.js';

class SearchView extends View {
  _parentEl = document.querySelector('.results');
  _buttonEl = document.querySelector('.search__btn');
  _searchFieldEl = document.querySelector('.search__field');

  _errorMsg = 'We could not find that meal please try another one!';
  _message = '';

  takeSearchİnput() {
    let searchWord = this._searchFieldEl.value;
    return searchWord;
  }

  clearSearchInput() {
    this._searchFieldEl.value = '';
  }

  addHandlerRender(handler) {
    this._buttonEl.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup() {
    const currentUrlİd = window.location.hash.slice(1);
    return `
    ${this._data
      .map(res => {
        return `<li class="preview">
        <a class="preview__link ${
          currentUrlİd === res.id ? 'preview__link--active' : ''
        }" href="#${res.id}">
          <figure class="preview__fig">
            <img src="${res.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join('')}
`;
  }
}

export default new SearchView();
