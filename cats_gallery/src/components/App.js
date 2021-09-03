import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import Loading from './Loading.js';
import ImageView from './ImageView.js';

const cache = {};

export default class App {
  constructor({ $app, api }) {
    this.api = api;
    this.state = {
      isRoot: true,
      isLoading: false,
      nodes: [],
      depth: [],
      selectedFile: null,
    };

    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: this.state.depth,
      onNavClick: index => this.onNavClick(index),
    });

    this.nodes = new Nodes({
      $app,
      initialState: this.state,
      onClick: node => this.onClick(node),
      onBackClick: () => this.onBackClick(),
    });

    this.loading = new Loading({
      $app,
      initialState: this.state.isLoading,
    });

    this.imageView = new ImageView({
      $app,
      initialState: this.state.selectedFile,
      onCloseClick: () => this.onCloseClick(),
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadcrumb.setState(this.state.depth);
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    this.loading.setState(this.state.isLoading);
    this.imageView.setState(this.state.selectedFile);
  }

  onNavClick(index) {
    if (!index) {
      this.setState({
        ...this.state,
        isRoot: true,
        depth: [],
        nodes: cache.root,
      });
    } else {
      const nextState = this.state.depth.slice(0, index + 1);
      this.setState({
        ...this.state,
        depth: nextState,
        nodes: cache[nextState[nextState.length - 1].id],
      });
    }
  }

  async onClick(node) {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      if (node.type === 'DIRECTORY') {
        const selectedNode = cache[node.id]
          ? cache[node.id]
          : await this.api.request(node.id);
        this.setState({
          ...this.State,
          isRoot: false,
          nodes: selectedNode,
          depth: [...this.state.depth, node],
        });
        cache[node.id] = selectedNode;
      } else if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedFile: node.filePath,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  onBackClick() {
    const backState = this.state;
    backState.depth.pop();

    const prevNodeId =
      backState.depth.length === 0
        ? null
        : backState.depth[backState.depth.length - 1].id;

    if (prevNodeId === null) {
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: cache.root,
      });
    } else {
      this.setState({
        ...this.state,
        isRoot: false,
        nodes: cache[prevNodeId],
      });
    }
  }

  onCloseClick() {
    this.setState({
      ...this.state,
      selectedFile: null,
    });
  }

  async init() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      const rootNodes = await this.api.request();
      this.setState({
        ...this.state,
        nodes: rootNodes,
      });
      cache.root = rootNodes;
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }
}
