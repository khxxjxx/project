const IMG =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageView {
  constructor({ $app, initialState, onCloseClick }) {
    this.state = initialState;
    this.onCloseClick = onCloseClick;
    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageViewer';
    $app.appendChild(this.$target);

    this.$target.addEventListener('click', e => {
      if (e.target.localName !== 'img') {
        this.onCloseClick();
      }
    });

    window.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.onCloseClick();
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state
      ? `<div class="content"><img src=${IMG}${this.state}></div>`
      : '';
    this.$target.style.display = this.state ? 'block' : 'none';
  }
}
