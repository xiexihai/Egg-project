'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/user/getUserList', controller.user.getUserList);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
};
