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
    return {
      mysql: {
        package: 'ys-dbo-mysql',
        options: {
          host     : 'localhost',
          user     : 'me',
          password : 'secret',
          database : 'my_db',
          pool: true, // 是否使用pool
        }
      },
      redis: {
        package: 'ys-dbo-redis',
        options: {
          host     : '',
          password : '',
          port     : 6379,
          keepAlive: 0
        }
      }
    }
  }
}