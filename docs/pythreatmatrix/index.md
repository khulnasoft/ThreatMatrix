:fontawesome-brands-github: [PyThreatMatrix Repository](https://github.com/khulnasoft/pythreatmatrix)

# Welcome to PyThreatMatrix's documentation!

## Robust Python SDK and Command Line Client for interacting with ThreatMatrix API.

### Installation

```
pip install pythreatmatrix
```

### Usage as CLI

```
 pythreatmatrix
 Usage: pythreatmatrix [OPTIONS] COMMAND [ARGS]...

 Options:
 -d, --debug  Set log level to DEBUG
 --version    Show the version and exit.
 -h, --help   Show this message and exit.

 Commands:
 analyse                Send new analysis request
 analyzer-healthcheck   Send healthcheck request for an analyzer...
 config                 Set or view config variables
 connector-healthcheck  Send healthcheck request for a connector
 get-analyzer-config    Get current state of `analyzer_config.json` from...
 get-connector-config   Get current state of `connector_config.json` from...
 get-playbook-config    Get current state of `playbook_config.json` from...
 jobs                   Manage Jobs
 tags                   Manage tags
```

#### Configuration:

You can use `set` to set the config variables and `get` to view them.

```
pythreatmatrix config set -k 4bf03f20add626e7138f4023e4cf52b8 -u "http://localhost:80"
pythreatmatrix config get
```

#### Hint

The CLI would is well-documented which will help you navigate various commands easily. Invoke `pythreatmatrix -h` or `pythreatmatrix <command> -h` to get help.

### Usage as SDK/library

```python
 from pythreatmatrix import ThreatMatrix, ThreatMatrixClientException
 obj = ThreatMatrix(
    "4bf03f20add626e7138f4023e4cf52b8",
    "http://localhost:80",
    None,
 )
 """
 obj = ThreatMatrix(
    "<your_api_key>",
    "<your_threatmatrix_instance_url>",
    "optional<path_to_pem_file>"
    "optional<proxies>"
 )
 """

 try:
    ans = obj.get_analyzer_configs()
    print(ans)
 except ThreatMatrixClientException as e:
    print("Oh no! Error: ", e)
```

#### Tip

We very much recommend going through the [:class:`pythreatmatrix.pythreatmatrix.ThreatMatrix`](https://github.com/khulnasoft/pythreatmatrix/blob/master/docs/index.rst#id1) docs.

### Index

```
.. toctree::
   :maxdepth: 2
   :caption: Usage

   pythreatmatrix
```

```
  .. toctree::
   :maxdepth: 2
   :caption: Development

   tests

```
