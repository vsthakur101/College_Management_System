const http = require("http");
const app = require("./app/app");
require('dotenv').config();
require("./config/dbConnect")

const PORT = process.env.PORT || 2023;

//===========Server===========
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
