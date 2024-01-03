const express = require('express');
const app = express();
const fs = require("fs");
const port = 8081;

app.use('/', express.static('web/'))

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${port}`);
  res.setHeader("Access-Control-Allow-Headers", ["content-type"]);
  next();
});

app.use(express.json());

app.post('/data', (req, res) => {
  fs.writeFile("/tmp/data.json", JSON.stringify(req.body), err => {
    console.error(err);
  });
  res.status(200).send("");
});

app.get('/data', (req, res) => {
  const file = fs.readFile("/tmp/data.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("");
    }
    res.status(200).send(data);
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
