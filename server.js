const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 7000;
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello Dear');
});
app.listen(port, () => {console.log(`http://localhost:${port}/`)});