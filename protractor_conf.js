exports.config = {
  allScriptsTimeout: 99999,
  directConnect: true,

  seleniumArgs: ['-browserTimeout=60'],
  capabilities: {
    'browserName': 'firefox'
  },
  specs: ['test/e2e/**/*.spec.js'],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
  }
};
