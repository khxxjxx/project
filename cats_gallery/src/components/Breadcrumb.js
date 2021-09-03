export default class Breadcrumb {
  constructor({ $app, initialState, onNavClick }) {
    this.state = initialState;
    this.onNavClick = onNavClick;
    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';
    $app.appendChild(this.$target);

    this.$target.addEventListener('click', e => {
      const nav = e.target.closest('.nav');
      if (nav) {
        const { index } = nav.dataset;
        if (!index) {
          this.onNavClick();
        } else {
          this.onNavClick(index);
        }
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const isRoot = this.state.length === 0;
    this.$target.innerHTML = `<div class="nav">root</div>${
      isRoot
        ? ''
        : this.state
            .map(
              (depth, idx) =>
                `<div class="nav" data-index=${idx}>${depth.name}</div>`
            )
            .join('')
    }`;
  }
}
