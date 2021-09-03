const API = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export default class Api {
  async request(nodeId) {
    try {
      const res = await fetch(`${API}/${nodeId ? nodeId : ''}`);

      if (!res.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다!');
      }
      return await res.json();
    } catch (err) {
      throw new Error(`문제가 발생하였습니다! => ${err.message}`);
    }
  }
}
