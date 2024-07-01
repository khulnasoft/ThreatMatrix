# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.


class NotRunnablePivot(Exception):
    pass


class PivotConfigurationException(Exception):
    pass


class PivotRunException(Exception):
    pass


class PivotFieldNotFoundException(Exception):
    pass
