const ModuleManager = require('./ModuleManager');

const manager = new ModuleManager([
    require('./api')
]);

module.exports = function (app) {
    manager.register(app, {});
};


