// 使用插件的json配置
exports.use = '{ enable: true, package: \'ys-pg-dbo\', agent: \'agent\' }';
// 插件通用配置
exports.common = `[
  (() => {
    const mysql = require('ys-dbo-mysql');
    return new mysql('mysql', {
      host     : 'localhost',
      user     : 'me',
      password : 'secret',
      database : 'my_db',
      pool: true, // 是否使用pool
    })
  })(),
  (() => {
    const redis = require('ys-dbo-reids');
    return new redis('redis', {
      host     : '',
      password : '',
      port     : 6379,
      keepAlive: 0
    });
  })()
]`;