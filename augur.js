
var augur = (function (canExport) {
  'use strict';

  function dotProduct(element1, element2) {
    return element1.reduce(function (prev, current, idx) {
      return prev * (idx - 1 ? 1 : element2[idx - 1]) + current * element2[idx];
    });
  }

  function selfDotProduct(element) {
    return dotProduct(element, element);
  }

  /**
   * SVR kernel RBF
   * config:
   * - supportVectors ([float])
   * - dualCoefs ([float]): dual_coefs_ are values used by scikit-learn
   * - epsilon (float)
   * - bias (float)
   * - Xmins ([float])
   * - Xmaxs ([float])
   * - Xmeans ([float])
   * - ymin (float)
   * - ymax (float)
   * - ymean (float)
   */

  function SVR(config) {

    this.supportVectors = config.supportVectors;
    this.dualCoef = config.dualCoef;

    this.gamma = config.gamma;
    this.bias = config.bias;

    this.Xmins = config.Xmins;
    this.Xmaxs = config.Xmaxs;
    this.Xmeans = config.Xmeans;

    this.ymin = config.ymin;
    this.ymax = config.ymax;
    this.ymean = config.ymean;
  }


  /**
   * predict:
   * - element ([float]): values you want to predict
   */
  SVR.prototype.predict = function (element) {
    var sum = 0.0,
        normalizedElement = this._normalize(element),
        diff, norm;

    for (var i = 0; i < this.supportVectors.length; i++) {
      diff = [];
      norm = 0.0;

      for (var j = 0; j < normalizedElement.length; j++)
        diff.push(this.supportVectors[i][j] - normalizedElement[j]);
      for (var k = 0; k < diff.length; k++)
        norm += diff[k] * diff[k];
      sum += this.dualCoef[i] * Math.exp(-this.gamma * norm);
    }
    // return sum + this.bias;
    return this._unNormalize(sum + this.bias);
  };

  SVR.prototype._normalize = function (values) {
    var res = [],
        _this = this;

    for (var i = 0; i < values.length; i++) {
      res.push((values[i] - _this.Xmeans[i]) / (_this.Xmaxs[i] - _this.Xmins[i]))
    }
    return res;
  };

  SVR.prototype._unNormalize = function (value) {
    return value * (this.ymax - this.ymin) + this.ymean;
  };

  if (canExport) {
    module.exports = { SVR: SVR };
  }
  return { SVR: SVR };

})(typeof module !== 'undefined' && module.exports);
