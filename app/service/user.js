'use strict';
// app/service/user.js
const Service = require('egg').Service;
const datetime = require('silly-datetime');
class UserService extends Service {

  /* @description 添加用户
   * @params { object } params.username 用户名
   * @params { object } params.password 密码
   * @return { number } 入库数量
  */
  async register(params) {
    try {
      params.created_time = datetime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const result = await this.app.mysql.insert('tb_user', params);
      const data = result.affectedRows === 1;
      return data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /* @description 获取用户列表
   * @return { array } 用户列表
  */
  async getUserList() {
    return await this.app.mysql.select('tb_user', {
      orders: [[ 'created_time', 'desc' ]],
    });
  }

  /* @description 根据用户名查找单个用户数据
   * @params { string } username 用户名
   * @return { object } 用户信息
  */
  async getUserOneByUserName(username) {
    return await this.app.mysql.get('tb_user', { username });
  }

  /* @description 登录
   * @params { object } params.username 用户名
   * @params { object } params.password 密码
   * @return { object } 用户登录信息
  */
  async login(params) {
    try {
      return await this.app.mysql.get('tb_user', params);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}

module.exports = UserService;
