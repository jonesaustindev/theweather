require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DarkSkyApi = require('dark-sky-api');
const errorHandler = require('./handlers/error');
const searchRoutes = require('./routes/search');
const bodyParser = require('body-parser');

const app = express();

// middleware //
app.use(cors());
app.use(bodyParser.json());

// darkskyapi config //
apiKey = process.env.API_KEY;
DarkSkyApi.proxy = true;
DarkSkyApi.initialize();

// Google geolocation config //
googleApiKey = process.env.GOOGLE_API_KEY;

// port //
const port = process.env.PORT || 5000;


// routes //
app.use('/api', 
    searchRoutes
);


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
