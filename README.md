# Augur

Prediction tool based on Scikit-learn SVR output. 

```javascript
var omens = augur.SVR(require('./salary.json');

yours = omens.predict([35, 21, 5, 102.0]); // yours => 42,000.0   
```

## Usage:

Export SVR output:
```python
import augur

X = np.sort(5 * np.random.rand(40, 1), axis=0)
y = np.sin(X).ravel()

nX = (X - X.mean()) / (X.max() - X.min())
ny = (y - y.mean()) / (y.max() - y.min())

svr_rbf = SVR(kernel='rbf', C=1e5, gamma=0.1, epsilon=0.01)
svr = svr_rbf.fit(X, y)

Xmins = [X.min().item()]
Xmaxs = [X.max().item()]
Xmeans = [X.mean().item()]

ymin = y.min().item()
ymax = y.max().item()
ymean = y.mean().item()

augur.export('output.json', svr, Xmins, Xmaxs, Xmeans, ymin, ymax, ymean)

```

Import it with javascipt:
```javascript
var augur = require('./augur');

var svr = new augur.SVR(require('./output.json'))

console.log('prediction =', svr.predict([0.42989068]));
```

The Python `augur-export` module help you to export a Scikit-learn SVR output.
JSON resulting file should contains:
- support vectors
- dual coefs
- bias
- gamma

## TODO:
- linear kernel
- normalization should be optionnal