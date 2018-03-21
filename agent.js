const DBO = require('ys-dbo');
module.exports = async (component, agent) => {
  const config = component.options;
  const dbo = new DBO(config);
  agent.dbo = dbo;
  agent.on('ready', async () => {
    await dbo.connect();
    component.use(dbo.way({
      error(err) {
        if (agent.env !== 'product') {
          console.log(err);
        }
        return ctx => {
          ctx.reply({
            error: agent.env !== 'product' 
              ? err.stacks 
              : err.message
          });
        }
      }
    }))
  });
  agent.on('destroy', async () => {
    await dbo.disconnect();
  });
}