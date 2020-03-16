'use strict';
// app/service/user.js
const Service = require('egg').Service;
const datetime = require('silly-datetime');
class BookService extends Service {

  /* @description 创建账本
     * @params { object } params.name 账本名称
     * @params { object } params.background 账本背景
     * @return { number } 入库数量
    */
  async add(params) {
    try {
      params.created_time = datetime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const result = await this.app.mysql.insert('tb_account_book', params);
      const data = result.affectedRows === 1;
      return data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /* @description 修改账本
     * @params { object } params.id 账本id
     * @params { object } params.name 账本名称
     * @params { object } params.background 账本背景
     * @return { number } 入库数量
    */
  async update(params) {
    try {
      params.created_time = datetime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const result = await this.app.mysql.update('tb_account_book', params);
      const data = result.affectedRows === 1;
      return data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /* @description 获取账本列表
   * @params { string } uid 用户id
    * @return { array } 账本列表
  */
  async getList(uid) {
    return await this.app.mysql.select('tb_account_book', {
      where: { uid },
      orders: [[ 'created_time', 'desc' ]],
      limit: 20,
      offset: 0,
    });
  }


  /* @description 根据账本名称查找单个账本数据
   * @params { string } uid 用户id
   * @params { string } name 账本名称
   * @return { object } 账本信息
  */
  async getBookOneByName(uid, name) {
    return await this.app.mysql.get('tb_account_book', { uid, name });
  }
}

module.exports = BookService;
