# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.


class NotRunnableConnector(Exception):
    pass


class ConnectorConfigurationException(Exception):
    pass


class ConnectorRunException(Exception):
    pass
