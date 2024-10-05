# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.


class NotRunnableIngestor(Exception):
    pass


class IngestorConfigurationException(Exception):
    pass


class IngestorRunException(Exception):
    pass
