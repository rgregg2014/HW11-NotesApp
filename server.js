//need middleware stuff from starwars demos to make anything do anything
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
