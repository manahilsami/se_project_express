const express = require("express");
const app = express();

const { PORT = 3001 } = process.env;

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
