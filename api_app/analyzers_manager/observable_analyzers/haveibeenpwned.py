# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.

import requests

from api_app.analyzers_manager import classes
from tests.mock_utils import MockUpResponse, if_mock_connections, patch


class HaveIBeenPwned(classes.ObservableAnalyzer):
    url: str = "https://haveibeenpwned.com/api/v3/breachedaccount/"

    truncate_response: bool
    include_unverified: bool
    domain: str
    _api_key_name: str

    @classmethod
    def update(cls) -> bool:
        pass

    def run(self):
        params = {
            "truncateResponse": self.truncate_response,
            "includeUnverified": self.include_unverified,
        }
        if self.domain:
            params["domain"] = self.domain

        headers = {"hibp-api-key": self._api_key_name}

        response = requests.get(
            self.url + self.observable_name, params=params, headers=headers
        )
        response.raise_for_status()

        result = response.json()
        return result

    @classmethod
    def _monkeypatch(cls):
        patches = [
            if_mock_connections(
                patch(
                    "requests.get",
                    return_value=MockUpResponse({}, 200),
                ),
            )
        ]
        return super()._monkeypatch(patches=patches)
