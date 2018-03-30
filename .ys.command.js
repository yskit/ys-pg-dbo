module.exports = class CommanderModule {
  constructor(thread, installer) {
    this.installer = installer;
    this.thread = thread;
  }

  ['options:plugin']() {
    return {
      enable: true,
      package: 'ys-pg-dbo',
      agent: 'agent',
      dependencies: []
    };
  }

  ['env:common']() {
    return `[
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
        const redis = require('ys-dbo-redis');
        return new redis('redis', {
          host     : '',
          password : '',
          port     : 6379,
          keepAlive: 0
        });
      })()
    ]`
  }
}