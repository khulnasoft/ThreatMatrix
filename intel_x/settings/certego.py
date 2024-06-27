# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

# certego_saas
from ._util import get_secret
from .security import WEB_CLIENT_URL

HOST_URI = WEB_CLIENT_URL
HOST_NAME = "IntelX"
CERTEGO_SAAS = {
    "USER_ACCESS_SERIALIZER": "authentication.serializers.UserAccessSerializer",
    "HOST_URI": HOST_URI,
    "HOST_NAME": HOST_NAME,
    "ORGANIZATION_MAX_MEMBERS": get_secret("ORGANIZATION_MAX_MEMBERS", 100),
}
DEFAULT_SLACK_CHANNEL = get_secret("DEFAULT_SLACK_CHANNEL")
SLACK_TOKEN = get_secret("SLACK_TOKEN")
