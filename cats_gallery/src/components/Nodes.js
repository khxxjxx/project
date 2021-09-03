export default class Nodes {
  constructor({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);

    this.$target.addEventListener('click', e => {
      const node = e.target.closest('.Node');
      if (node) {
        const { nodeId } = node.dataset;
        if (!nodeId) {
          this.onBackClick();
        } else {
          const selectedNode = this.state.nodes.find(
            node => node.id === nodeId
          );
          this.onClick(selectedNode);
        }
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const node = this.state.nodes
      .map(node => {
        const img =
          node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';
        return `<div class="Node" data-node-id=${node.id}><img src=${img} /><div>${node.name}</div></div>`;
      })
      .join('');

    this.$target.innerHTML = this.state.isRoot
      ? node
      : `<div class="Node"><img src="./assets/prev.png" /></div>${node}`;
  }
}
