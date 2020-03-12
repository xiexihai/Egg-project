/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 连接数据库
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'a1478963',
      // 数据库名
      database: 'db_blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 设置跨域
  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true,
  //   },
  //   domainWhiteList: '*',
  // };

  // config.cors = {
  //   origin: 'http://localhost:8090',
  //   credentials: true,
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583853572223_3282';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
