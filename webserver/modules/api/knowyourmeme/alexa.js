const Module = require('../../Module');
const knowyourmeme = require('../../../../api/knowyourmeme');

class AlexaModule extends Module {
    constructor() {
        super('alexa');
    }

    register(app, extra) {
        app.get('/alexa/:meme', (req, res) => {
            const meme = req.params.meme;

            knowyourmeme.search(meme)
                .then((about) => {
                    if (!about) {
                        throw new Error('Invalid response');
                    }

                    res.status(200).json({text: about});
                })
                .catch((e) => {
                    let errorType;
                    if (e.toString().toLowerCase().contains('no results')) {
                        errorType = 'no_results';
                    }

                    res.status(500).json({error: e.toString(), errorText: errorType });
                });
        });
    }
}

module.exports = new AlexaModule();