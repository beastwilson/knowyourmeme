const express = require('express');
const app = express();

require('./modules/')(app);



app.listen(80, () => {
    console.log('Webserver now listening on port 80!');
});