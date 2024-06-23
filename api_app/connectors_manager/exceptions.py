# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.


class NotRunnableConnector(Exception):
    pass


class ConnectorConfigurationException(Exception):
    pass


class ConnectorRunException(Exception):
    pass
