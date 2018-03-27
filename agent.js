const DBO = require('ys-dbo');
const debug = require('debug')('pg-dbo:agent');
module.exports = async (component, agent) => {
  const config = component.options;
  const dbo = new DBO(config);
  agent.dbo = dbo;
  component.use(dbo.way({
    error(err) {
      debug(err);
      return ctx => {
        ctx.body = {
          error: agent.env !== 'product' 
            ? err.stack 
            : err.message
        }
      }
    }
  }));
  agent.on('ready', async () => await dbo.connect());
  agent.on('destroy', async () => await dbo.disconnect());
}