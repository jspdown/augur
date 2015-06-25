
var augur = require('../augur');

var svr = new augur.SVR(require('./output.json'))

console.log('prediction =', svr.predict([0.42989068]));
