import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs'
import rfs from 'rotating-file-stream' // version 2.x
import path from 'path';

import rootDir from '../utils/rootDirPath.js';
import routes from '../api/routes/index.js';
import vars from './vars.js';

// import multer from "multer";
// const upload = multer()

/**
* Express instance
* @public
*/
const app = express();


if (vars.logs == "combined") {

    // var accessLogStream = fs.createWriteStream(rootDir()+'/access.log', { flags: 'a' })

    var accessLogStream = rfs.createStream(`access.log`, {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip", // compress rotated files
        path: `${rootDir()}/logs`
    });

    var errorLogStream = rfs.createStream(`error.log`, {
        size: "10M", // rotate every 10 MegaBytes written
        compress: "gzip", // compress rotated files
        path: `${rootDir()}/logs`
    })

    // request logging. dev: console | production: file
    app.use(morgan(vars.logs, { stream: accessLogStream }, { flags: 'a' }));
    app.use(morgan(vars.logs, { stream: errorLogStream, skip: function (req, res) { return res.statusCode < 400 } }))

} else {
    app.use(morgan(vars.logs));
}



// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(vars.cookiesSecret))

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: "*"}));

// mount api v1 routes
app.use('/api', routes);

// // if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// // catch 404 and forward to error handler
// app.use(error.notFound);

// // error handler, send stacktrace only during development
// app.use(error.handler);

export default app;
