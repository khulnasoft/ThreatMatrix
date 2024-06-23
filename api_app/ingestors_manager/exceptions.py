# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.


class NotRunnableIngestor(Exception):
    pass


class IngestorConfigurationException(Exception):
    pass


class IngestorRunException(Exception):
    pass
