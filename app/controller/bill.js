'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {


  /* @description 创建账单
     * @methods POST
     * @params { object } params.book_id 账本id
     * @params { object } params.title 账单名称
     * @params { object } params.desc 账单描述
     * @params { object } params.price 账单金额
     * @params { object } params.type 账单类型
    */
  async add() {
    const { ctx } = this;
    const { book_id, title, desc, price, type } = ctx.request.body;
    // 账本分类不能为空
    if (book_id === '') {
      ctx.body = {
        code: 400,
        msg: '账本分类不能为空',
      };
      return;
    }

    // 账单名称不能为空
    if (title === '') {
      ctx.body = {
        code: 400,
        msg: '账单名称不能为空',
      };
      return;
    }

    // 账单金额不能为空
    if (price === '') {
      ctx.body = {
        code: 400,
        msg: '账单金额不能为空',
      };
      return;
    }

    // 账单类型不能为空
    if (type === '') {
      ctx.body = {
        code: 400,
        msg: '账单类型不能为空',
      };
      return;
    }

    const uid = await ctx.helper.getUid();
    const result = await ctx.service.bill.add({ uid, book_id, title, desc, price, type });
    ctx.body = {
      code: result ? 200 : 400,
      msg: result ? '添加成功' : '添加失败',
      data: result || null,
    };

  }

  /* @description 修改账单
     * @methods POST
     * @params { object } params.id 账单id
     * @params { object } params.book_id 账本id
     * @params { object } params.title 账单名称
     * @params { object } params.desc 账单描述
     * @params { object } params.price 账单金额
     * @params { object } params.type 账单类型
    */
  async update() {
    const { ctx } = this;
    const { id, book_id, title, desc, price, type } = ctx.request.body;
    // 账本分类不能为空
    if (book_id === '') {
      ctx.body = {
        code: 400,
        msg: '账本分类不能为空',
      };
      return;
    }

    // 账单名称不能为空
    if (title === '') {
      ctx.body = {
        code: 400,
        msg: '账单名称不能为空',
      };
      return;
    }

    // 账单金额不能为空
    if (price === '') {
      ctx.body = {
        code: 400,
        msg: '账单金额不能为空',
      };
      return;
    }

    // 账单类型不能为空
    if (type === '') {
      ctx.body = {
        code: 400,
        msg: '账单类型不能为空',
      };
      return;
    }
    const uid = await ctx.helper.getUid();
    const result = await ctx.service.bill.update({ id, uid, book_id, title, desc, price, type });
    ctx.body = {
      code: result ? 200 : 400,
      msg: result ? '修改成功' : '修改失败',
      data: result || null,
    };

  }

  /* @description 获取账单列表
   * @methods GET
  */
  async getList() {
    const { ctx } = this;
    const uid = await ctx.helper.getUid();
    const where = {
      uid,
    };
    if (ctx.request.query.book_id) {
      where.book_id = ctx.request.query.book_id;
    }
    if (ctx.request.query.title) {
      where.title = ctx.request.query.title;
    }
    const data = await ctx.service.bill.getList(where);
    ctx.body = {
      code: 200,
      msg: 'success',
      data,
    };
  }

  /* @description 获取账单详情
   * @methods GET
  */
  async getOne() {
    const { ctx } = this;
    const uid = await ctx.helper.getUid();
    const id = ctx.params.id;
    const data = await ctx.service.bill.getOne({ uid, id });
    ctx.body = {
      code: 200,
      msg: 'success',
      data: data[0],
    };
  }

  /* @description 获取账单金额
   * @methods GET
  */
  async getAmount() {
    const { ctx } = this;
    const uid = await ctx.helper.getUid();
    const where = {
      uid,
    };
    const data = await ctx.service.bill.getAmount(where);
    let income = 0; // 收入
    let expend = 0; // 支出
    if (data.length) {
      data.forEach(item => {
        if (item.type === 1) {
          expend += item.price;
        } else {
          income += item.price;
        }
      });
    }
    ctx.body = {
      code: 200,
      msg: 'success',
      data: {
        income,
        expend,
      },
    };
  }

}

module.exports = BillController;
