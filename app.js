const DBO = require('ys-dbo');
module.exports = async (app, configs) => {
  const dbo = new DBO(configs);
  
  app.on('destroy', async () => {
    await dbo.disconnect();
  });

  app.on('serverWillStart', async koa => {
    await dbo.connect();
    koa.use(dbo.way({
      error(err) {
        if (app.env !== 'product') {
          console.log(err);
        }
        return ctx => {
          ctx.status = !isNaN(err.code) ? Number(err.code) : 500;
          ctx.body = app.env !== 'product' ? err.stack : err.message;
        }
      }
    }));
  });
}