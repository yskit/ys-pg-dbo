module.exports = options => {
  const result = [];
  for (const namespace in options) {
    const config = options[namespace];
    const target = require(config.package);
    result.push(new target(namespace, config.options));
  }
  return result;
}