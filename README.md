# Augur

Prediction tool based on Scikit-learn SVR output. 

## Feature:

```javascript
var omens = augur.SVR(require('./salary.json');

yours = omens.predict([35, 21, 5, 102.0]); // yours => 42,000.0   
```

The Python `augur-export` module help you to export a Scikit-learn SVR output.
JSON resulting file should contains:
- support vectors
- dual bias
- bias
- epsilon
- gamma
- C

## TODO:
- linear kernel
- normalization should be optionnal