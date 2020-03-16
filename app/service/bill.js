'use strict';
// app/service/user.js
const Service = require('egg').Service;
const datetime = require('silly-datetime');
class BillService extends Service {

  /* @description 创建账单
     * @params { object } params.book_id 账本id
     * @params { object } params.title 账单名称
     * @params { object } params.desc 账单描述
     * @params { object } params.price 账单金额
     * @params { object } params.type 账单类型
     * @return { number } 入库数量
    */
  async add(params) {
    try {
      params.created_time = datetime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const result = await this.app.mysql.insert('tb_account_bill', params);
      const data = result.affectedRows === 1;
      return data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /* @description 修改账单
     * @params { object } params.id 账单id
     * @params { object } params.book_id 账本id
     * @params { object } params.title 账单名称
     * @params { object } params.desc 账单描述
     * @params { object } params.price 账单金额
     * @params { object } params.type 账单类型
     * @return { number } 入库数量
    */
  async update(params) {
    try {
      params.created_time = datetime.format(new Date(), 'YYYY-MM-DD HH:mm');
      const result = await this.app.mysql.update('tb_account_bill', params);
      const data = result.affectedRows === 1;
      return data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /* @description 获取账单列表
    * @return { where } 查询条件
    * @return { array } 账单列表
  */
  async getList(where) {
    return await this.app.mysql.select('tb_account_bill', {
      where,
      orders: [[ 'created_time', 'desc' ]],
      limit: 20,
      offset: 0,
    });
  }

  /* @description 获取账单列表
    * @return { where } 查询条件
    * @return { array } 账单列表
  */
  async getOne(where) {
    return await this.app.mysql.select('tb_account_bill', {
      where,
      orders: [[ 'created_time', 'desc' ]],
      limit: 1,
      offset: 0,
    });
  }

  /* @description 获取账单列表
    * @return { where } 查询条件
    * @return { array } 账单列表
  */
  async getAmount(where) {
    return await this.app.mysql.select('tb_account_bill', {
      where,
      columns: [ 'price', 'type' ],
      orders: [[ 'created_time', 'desc' ]],
      limit: 2000000,
      offset: 0,
    });
  }
}

module.exports = BillService;
