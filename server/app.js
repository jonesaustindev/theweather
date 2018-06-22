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

app.use(express.static(__dirname));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });

// api call //
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
