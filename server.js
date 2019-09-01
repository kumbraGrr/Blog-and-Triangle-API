const app = require('./app')

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}`));

module.export = port;
