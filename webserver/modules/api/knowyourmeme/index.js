const RouterModuleManager = require('../../RouterModuleManager');

class KnowYourMemeManager extends RouterModuleManager {
    constructor() {
        super('/knowyourmeme', [
            require('./alexa')
        ]);
    }
}

module.exports = new KnowYourMemeManager();