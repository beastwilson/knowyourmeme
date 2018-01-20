const RouterModuleManager = require('../RouterModuleManager');

class ApiManager extends RouterModuleManager {
    constructor() {
        super('/api', [
            require('./knowyourmeme/')
        ]);
    }
}

module.exports = new ApiManager();