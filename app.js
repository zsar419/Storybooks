const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.get('/', (req, res) => {
    res.send('WORKING!');
});

const port = process.env.PORT || 5000;  // Use process port (if deployed online) else use port 5000 for local deployments
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
