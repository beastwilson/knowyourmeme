class ModuleManager {
    /**
     * Create this module manager.
     * @param modules {Array<Module|ModuleManager>} - An array of modules (or module managers, since they have the same
     * register signature) for which to be registered.
     */
    constructor(modules) {
        this.modules = modules;
    }

    register(app, extra) {
        this.modules.forEach(module => module.register(app, extra));
    }
}

module.exports = ModuleManager;