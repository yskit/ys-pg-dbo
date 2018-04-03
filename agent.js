const DBO = require('ys-dbo');
const debug = require('debug')('pg-dbo:agent');
const Options = require('./options');
module.exports = async (app, configs = {}) => {
  let dbo;
  
  app.on('destroy', async () => {
    if (dbo) {
      await dbo.disconnect();
    }
  });

  app.on('serverWillStart', async koa => {
    const config = Options(configs);
    dbo = new DBO(config);
    await dbo.connect();
    koa.use(dbo.way({
      error(err) {
        debug(err);
        app.console.error(err.stack);
        return ctx => {
          ctx.body = {
            error: app.env !== 'product' ? err.stack : err.message
          }
        }
      }
    }));
  });
}