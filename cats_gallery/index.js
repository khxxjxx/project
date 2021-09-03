import App from './src/components/App.js';
import Api from './src/api/Api.js';

const api = new Api();
new App({ $app: document.querySelector('.app'), api: api });
