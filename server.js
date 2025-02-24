const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const booksAPI = require('./booksAPI');  // Import the books API file

app.use(bodyParser.json());  // Middleware to parse JSON bodies
app.use(booksAPI);  // Use the booksAPI route

const port = 3000;  // Port number to run the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
