const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Serve only the static files form the dist directory
    app.use(express.static('./dist/luckydraw'));

    mongoose.Promise = global.Promise;

    var dbUrl = process.env.MONGODB_URI || config.DB;

    console.log("dbUrl: " + dbUrl);

    mongoose.connect(dbUrl).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );
    const userRoutes = require('./routes/user.route');

    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    app.use('/api/v1/users', userRoutes);

    app.get('/*', function(req,res, next) {

        console.log('req.originalUrl : ' + req.originalUrl);

        if(req.originalUrl.includes('/api/v1/users')) {
            return next();
        }
    
        res.sendFile(path.join(__dirname,'/dist/luckydraw/index.html'));

        });

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });