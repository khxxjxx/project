export default class Breadcrumb {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';
    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const isRoot = this.state.length === 0;
    this.$target.innerHTML = `<div>root</div>${
      isRoot ? '' : this.state.map(depth => `<div>${depth.name}</div>`).join('')
    }`;
  }
}
