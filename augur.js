
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
    this.dualCoefs = config.dualCoefs;
    this.epsilon = config.epsilon;
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
        scaledElement = this._normalize(element), 
        x1Square = selfDotProduct(scaledElement),
        x2Square, dot;
    
    for (var i = 0; i < this.supportVectors.length; i++) {
      x2Square = selfDotProduct(this.supportVectors[i]);
      dot = dotProduct(scaledElement, this.supportVectors[i]);
      sum += this.dualCoefs[i] * Math.exp(-this.epsilon * (x1Square + x2Square - 2 * dot));
    }
    
    return this._unNormalize(sum + this.bias);
  };
 
  SVR.prototype._normalize = function (values) {
    return values.map(function (value, idx) {
      return (value - this.Xmeans[idx]) / (this.Xmaxs[idx] - this.Xmins[idx]);
    });
  };
  
  SVR.prototype._unNormalize = function (value) {
    return value * (this.ymax - this.ymin) + this.ymean;
  };

  if (canExport) {
    module.exports = { SVR: SVR };
  }
  return { SVR: SVR };

})(typeof module !== 'undefined' && module.exports);