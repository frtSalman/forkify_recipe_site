import View from './View.js';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  _errorMsg = 'We could not find any bookmark!! Pick some';
  _message = '';

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
            <img src="${res.image}" alt="Test" />
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

export default new BookmarkView();
