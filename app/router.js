'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 用户
  router.get('/api/user/getUserList', controller.user.getUserList);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  // 记账本
  router.post('/api/book/add', controller.book.add);
  router.post('/api/book/update', controller.book.update);
  router.get('/api/book/getList', controller.book.getList);
  // 记账单
  router.post('/api/bill/add', controller.bill.add);
  router.post('/api/bill/update', controller.bill.update);
  router.get('/api/bill/getList', controller.bill.getList);
  router.get('/api/bill/one/:id', controller.bill.getOne);
  router.get('/api/bill/amount', controller.bill.getAmount);

};
