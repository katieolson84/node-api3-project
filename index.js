// require your server and launch it
require("dotenv").config()
const server = require('./api/server.js');

const port = process.env.PORT || 8000

server.listen(port, () => {
    console.log(`\n*** Server is now running on http://localhost:${port} ***\n`);
});
