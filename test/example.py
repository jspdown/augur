

import numpy as np
from sklearn.svm import SVR
import matplotlib.pyplot as plt

from sklearn.preprocessing import normalize

###############################################################################
# Generate sample data
X = np.sort(5 * np.random.rand(40, 1), axis=0)
y = np.sin(X).ravel()
# Normalize
nX = (X - X.mean()) / (X.max() - X.min())
ny = (y - y.mean()) / (y.max() - y.min())
# Add noise to targets
ny[::5] += 3 * (0.5 - np.random.rand(8))

###############################################################################
# Fit regression model
svr_rbf = SVR(kernel='rbf', C=1e5, gamma=0.1, epsilon=0.01)
svr = svr_rbf.fit(nX, ny)
y_rbf = svr.predict(nX)

###############################################################################
# look at the results
plt.scatter(nX, ny, c='k', label='data')
plt.hold('on')
plt.plot(nX, y_rbf, c='g', label='RBF model')
plt.xlabel('data')
plt.ylabel('target')
plt.title('Support Vector Regression')
plt.legend()
plt.show()

###############################################################################
# export

import sys
import os
sys.path.insert(0, os.getcwd())
oldPath = sys.path
sys.path.append('../')

import augur
sys.path = oldPath

Xmins = [X.min().item()]
Xmaxs = [X.max().item()]
Xmeans = [X.mean().item()]

ymin = y.min().item()
ymax = y.max().item()
ymean = y.mean().item()

augur.export('test/output.json', svr, Xmins, Xmaxs, Xmeans, ymin, ymax, ymean)
