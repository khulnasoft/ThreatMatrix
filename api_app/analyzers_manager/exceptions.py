# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.


class NotRunnableAnalyzer(Exception):
    pass


class AnalyzerRunException(Exception):
    pass


class AnalyzerConfigurationException(Exception):
    pass
