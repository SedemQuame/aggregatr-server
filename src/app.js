/**Author: Sedem Quame Amekpewu
 * Date: Sunday, 11th February, 2021
 * Project Title: Aggregatr Server
 * Description: Simple server side application for taking data from the user database and displaying it onto the screen.
 **/

// ===================================== requiring modules ===================================== //
// node modules
const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const dotenv = require(`dotenv`);

// ================================== express app configurations ==================================== //
//creating app
const app = express();

// ========================================== configure environment variables  ========================================== //
if (!process.env.MODE) {
    dotenv.config({path: `./config/.env`});
}

// custom modules
const db = require(`./config/db.config`);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// ====================================== db configurations ========================================= //
mongoose.Promise = global.Promise;
console.log(db.uri)
const connectDB = () => {
    mongoose.connect(db.uri, db.options).catch((err) => {
        console.log(`Connection timed out.`);
        console.log(`Err: ${err.stack}`);
        app.use(function (req, res) {
            res.status(404).send('connection error');
        });
    }).then(() => {
        console.log(`DB Connected....`);
    });
};
connectDB();

//====================================== enabling CORs ========================================//
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//====================================== registering required routes ========================================//
require(`./routes/articles.routes`)(app);

// if the given route is not available print an err.
app.use(function (req, res) {
    res.status(404).send('route not found');
});

// ====================================== app listening port ======================================== //
let port = (process.env.PORT || 8091);
app.listen(port, function () {
    console.log(`app started on port: ${port}`);
    console.log(`Open app on http://localhost:${port}/`);
});
