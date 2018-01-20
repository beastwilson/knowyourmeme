/**
 * This is essentially just an interface so that
 * the module manager can get stuff to register
 * properly.
 */
class Module {
    constructor(name) {
        this.name = name;
    }

    /**
     * Register this module.
     * @param app {object} - the express app
     * @param extra {object} - an object containing additional params for the module
     */
    register(app, extra) {}
}

module.exports = Module;