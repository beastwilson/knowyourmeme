const Module = require('../../Module');
const search = require('../../../../api/search');

class AlexaModule extends Module {
    constructor() {
        super('alexa');
    }

    register(app, extra) {
        app.get('/alexa/:meme', (req, res) => {
            const meme = req.params.meme;

            search(meme)
                .then((about) => {
                    res.status(200).json({text: about});
                })
                .catch((e) => {
                    res.status(500).json({error: e.toString()});
                });
        });
    }
}

module.exports = new AlexaModule();