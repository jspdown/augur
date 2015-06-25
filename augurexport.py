import json
import io
from json import encoder

class _SVM_Result:
    def __init__(self, svr, Xmins, Xmaxs, Xmeans, ymin, ymax, ymean):
        self.supportVector = svr.support_vectors_.tolist()
        self.dualCoef = svr.dual_coef_.tolist()
        self.epsilon = svr.epsilon        
        self.Xmaxs = Xmaxs
        self.Xmins = Xmins
        self.Xmeans = Xmeans
        self.ymin = ymin
        self.ymax = ymax
        self.ymean = ymean

def _floatRepr(o):
    return format(o, 'f')
        
def _serializable(o):
    return o.__dict__
        
def _writeInFile(filename, data):
    encoder.FLOAT_REPR = floatRepr
    jsonFormated = json.dumps(data, default=serializable, ensure_ascii=True, indent=2)
    with io.open(filename, 'w', encoding='utf-8') as f:
        f.write(unicode(jsonFormated))
        
def export(filename, svr, Xmins, Xmaxs, Xmeans, ymin, ymax, ymean):
  _writeInFile(filename, _SVM_Result(svr, Xmins, Xmaxs, Xmeans, ymin, ymax, ymean))
 