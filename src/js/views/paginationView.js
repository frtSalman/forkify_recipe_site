import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  currentPage;

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.gopage;
      handler(goTo);
    });
  }

  _generateMarkup() {
    this.currentPage = this._data.page;
    const numOfPage = Math.ceil(
      this._data.query.length / this._data.resultsPerPages
    );
    // Eğer sadece 1 sayfalık results varsa
    if (this._data.query.length <= this._data.resultsPerPages) {
      return '';
    }
    // Eğer çok sayfalık result var ve son sayfada isen
    if (numOfPage === this.currentPage && numOfPage > 1) {
      return `
        <button data-gopage='${
          this.currentPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.currentPage - 1}</span>
        </button>
      `;
    }
    // Eğer çok sayfalık result var ve sen orta sayfalarda isen
    if (numOfPage > this.currentPage && this.currentPage > 1) {
      return `
        <button data-gopage='${
          this.currentPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.currentPage - 1}</span>
        </button>
        <button data-gopage='${
          this.currentPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${this.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // Eğer çok sayfa var ve sen ilk sayfada isen
    return `
        <button data-gopage='${
          this.currentPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${this.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
