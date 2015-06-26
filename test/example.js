
var yargs = require('yargs'),
    augur = require('../augur');


(function main() {
  'use strict';

  var svr = createSVR('./output.json'),
      argv = yargs.usage('Usage: $0 --value')
                  .demand(['value'])
                  .argv;

  if (argv.value) {
    console.log(predict(svr, argv.value));
  }
})()

function createSVR(filename) {
  return new augur.SVR(require(filename));
}

function predict(svr, value) {
  return svr.predict([value]);
}
