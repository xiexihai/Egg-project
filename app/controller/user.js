'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  /* @description 注册
   * @methods POST
   * @params { object } params.username 用户名
   * @params { object } params.password 密码
  */
  async register() {
    const { ctx } = this;
    const body = ctx.request.body;
    const params = {
      username: body.username,
      password: body.password,
    };
    let code;
    let msg;
    // 用户名不能为空
    if (params.username === '') {
      code = 400;
      msg = '用户名不能为空';
      ctx.body = {
        code,
        msg,
      };
      return;
    }
    // 查询该用户名是否已存在
    const one = await ctx.service.user.getUserOneByUserName(params.username);
    if (one) {
      code = 400;
      msg = '该用户名已注册';
      ctx.body = {
        code,
        msg,
      };
    } else {
      if (params.password === '') {
        code = 400;
        msg = '密码不能为空';
        ctx.body = {
          code,
          msg,
        };
        return;
      }
      const result = await ctx.service.user.register(params);
      code = result ? 200 : 400;
      msg = result ? '添加成功' : '添加失败';
    }
    ctx.body = {
      code,
      msg,
    };
  }

  /* @description 获取用户列表
   * @methods GET
  */
  async getUserList() {
    const { ctx } = this;
    const data = await ctx.service.user.getUserList();
    ctx.body = {
      code: 200,
      msg: 'success',
      data,
    };
  }

  /* @description 登录
   * @methods POST
   * @params { object } params.username 用户名
   * @params { object } params.password 密码
  */
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const params = {
      username: body.username,
      password: body.password,
    };
    let code;
    let msg;
    // 用户名不能为空
    if (params.username === '') {
      code = 400;
      msg = '用户名不能为空';
      ctx.body = {
        code,
        msg,
      };
      return;
    }
    // 查询该用户名是否已存在
    const one = await ctx.service.user.getUserOneByUserName(params.username);
    if (one) {
      // 密码不能为空
      if (params.password === '') {
        code = 400;
        msg = '密码不能为空';
        ctx.body = {
          code,
          msg,
        };
        return;
      }
      const result = await ctx.service.user.login(params);
      code = result ? 200 : 400;
      msg = result ? '登录成功' : '密码错误';
      ctx.body = {
        code,
        msg,
        data: result || null,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: '用户名不存在',
      };
    }
  }
}

module.exports = UserController;
