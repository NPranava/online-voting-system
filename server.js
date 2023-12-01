const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let options = {
  option1: 0,
  option2: 0,
};

app.get('/getVotes', (req, res) => {
  res.json(options);
});

app.post('/vote', (req, res) => {
  const { option } = req.body;
  if (options.hasOwnProperty(option)) {
    options[option]++;
    res.status(200).send('Voted successfully!');
  } else {
    res.status(400).send('Invalid option');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
