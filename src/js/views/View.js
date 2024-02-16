import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data) return;
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*')); // node list Array.from() ile arraya döndürüldü karşılaştırma için.
    const curElements = Array.from(this._parentEl.querySelectorAll('*')); // node list Array.from() ile arraya döndürüldü karşılaştırma için.

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Updates changed for attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(atts =>
          curEl.setAttribute(atts.name, atts.value)
        );
      }
    });
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
    <svg>
      <use href="${icons}_icon-loader"></use>
    </svg>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(msg = this._errorMsg) {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}!</p>
          </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(msg = this._message) {
    const html = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}_icon-smile"></use>
            </svg>
          </div>
          <p>${msg}!</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
