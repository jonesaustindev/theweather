require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const searchRoutes = require('./routes/search');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// middleware //
app.use(cors());
app.use(bodyParser.json());

// darkskyapi config //
apiKey = process.env.API_KEY;

// port //
const port = process.env.PORT || 5000;

// serve static files //
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// api call //
app.use('/api', 
    searchRoutes
);

// any other requests //
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// errors //
app.use(function(req, res, next){
    let err = new Error ('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

// app listen //
app.listen(port, () => {
    console.log(`theweather server has started on port ${port}`);
});
