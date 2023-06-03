const developerRouter = require('./routes/developer');
const gameRouter = require('./routes/games');
const cors = require("cors")
const express = require('express')
const app = express()




var corsOptions = {
    // origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/developers', developerRouter)
app.use('/api/games', gameRouter)

app.listen(8000, () => {
    console.log(`Example app listening on port ${8000}`)
})