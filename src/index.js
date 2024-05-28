// make bluebird default Promise
// import Promise from 'bluebird'; // eslint-disable-line no-global-assign
import vars from './configs/vars.js';
import app from './configs/express.js';

// listen to requests
app.listen(vars.port, () => console.info(`server started on port ${vars.port} (${vars.env})`));

/**
* Exports express
* @public
*/
export default app;
