'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {


  /* @description 创建账本
     * @methods POST
     * @params { object } params.name 账本名称
     * @params { object } params.background 账本背景
    */
  async add() {
    const { ctx } = this;
    const { name, background } = ctx.request.body;
    // 账本名称不能为空
    if (name === '') {
      ctx.body = {
        code: 400,
        msg: '账本名称不能为空',
      };
      return;
    }

    const uid = await ctx.helper.getUid();
    // 查询该账本名称是否已存在
    const one = await ctx.service.book.getBookOneByName(uid, name);
    if (one) {
      ctx.body = {
        code: 400,
        msg: '账本名称已存在',
      };
      return;
    }
    const result = await ctx.service.book.add({ uid, name, background });
    ctx.body = {
      code: result ? 200 : 400,
      msg: result ? '添加成功' : '添加失败',
      data: result || null,
    };

  }

  /* @description 修改账本
     * @methods POST
     * @params { object } params.id 账本id
     * @params { object } params.name 账本名称
     * @params { object } params.background 账本背景
    */
  async update() {
    const { ctx } = this;
    const { id, name, background } = ctx.request.body;
    // 账本名称不能为空
    if (id === '') {
      ctx.body = {
        code: 400,
        msg: '账本id不能为空',
      };
      return;
    }
    // 账本名称不能为空
    if (name === '') {
      ctx.body = {
        code: 400,
        msg: '账本名称不能为空',
      };
      return;
    }

    const uid = await ctx.helper.getUid();
    const result = await ctx.service.book.update({ id, uid, name, background });
    ctx.body = {
      code: result ? 200 : 400,
      msg: result ? '修改成功' : '修改失败',
      data: result || null,
    };

  }

  /* @description 获取账本列表
   * @methods GET
  */
  async getList() {
    const { ctx } = this;
    const uid = await ctx.helper.getUid();
    const data = await ctx.service.book.getList(uid);
    ctx.body = {
      code: 200,
      msg: 'success',
      data,
    };
  }
}

module.exports = BookController;
