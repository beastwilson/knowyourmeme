const express = require('express');

const ModuleManager = require('./ModuleManager');

class RouterModuleManager extends ModuleManager {
    constructor(path, modules) {
        super(modules);

        this.path = path;
    }

    register(app, extra) {
        const router = express.Router();

        super.register(router, extra);

        app.use(this.path, router);
    }
}

module.exports = RouterModuleManager;