'use strict';
module.exports = (options, app) => {
  // 拦截token
  return async function intercept(ctx, next) {
    const whiteUrls = options.whiteUrls || [];
    // 如果ctx.url在白名单中
    const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl));
    if (isWhiteUrl) {
      const token = ctx.request.get('Authorization');
      if (!token) {
        ctx.body = {
          code: 401,
          msg: '登录已失效，请重新登录',
        };
        // ctx.redirect('/login'); // 让用户去登录
      } else {
        const payload = await app.jwt.verify(token.split(' ')[1], app.jwt.secret);
        if (payload) {
          await next();
        } else {
          ctx.body = {
            code: 401,
            msg: '登录已失效，请重新登录',
          };
          // ctx.redirect('/login'); // 让用户去登录
        }
      }
    } else {
      await next();
    }
  };
};
