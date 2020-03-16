'use strict';
module.exports = {
  // 检测用户登录信息是否失效
  async getUid() {
    const token = this.ctx.request.get('Authorization');
    const payload = await this.app.jwt.verify(token.split(' ')[1], this.app.jwt.secret);
    return payload || '';
  },
};
