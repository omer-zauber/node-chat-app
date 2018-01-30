//const path = require('path');
const express = require('express');

const app = new express();
const port = process.env.PORT || 3000;
//const publicPath = path.join(__dirname, '../public');

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`server is up at port: ${port}`);
})



