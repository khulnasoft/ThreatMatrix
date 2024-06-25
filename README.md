# IntelX

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/khulnasoft/IntelX)](https://github.com/khulnasoft/IntelX/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/khulnasoft/IntelX?style=social)](https://github.com/khulnasoft/IntelX/stargazers)
[![Docker](https://img.shields.io/docker/pulls/khulnasoft/intelx)](https://hub.docker.com/repository/docker/khulnasoft/intelx)
[![Twitter Follow](https://img.shields.io/twitter/follow/intelx?style=social)](https://twitter.com/khulnasoft)
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/intelx/)
[![Official Site](https://img.shields.io/badge/official-site-blue)](https://khulnasoft.github.io)
[![Live Instance](https://img.shields.io/badge/live-demo-blue)](https://intelx.honeynet.org)

[![CodeFactor](https://www.codefactor.io/repository/github/khulnasoft/intelx/badge)](https://www.codefactor.io/repository/github/khulnasoft/intelx)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Imports: isort](https://img.shields.io/badge/%20imports-isort-%231674b1?style=flat&labelColor=ef8336)](https://pycqa.github.io/isort/)
[![CodeQL](https://github.com/khulnasoft/IntelX/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/khulnasoft/IntelX/actions/workflows/codeql-analysis.yml)
[![Dependency Review](https://github.com/khulnasoft/IntelX/actions/workflows/dependency_review.yml/badge.svg)](https://github.com/khulnasoft/IntelX/actions/workflows/dependency_review.yml)
[![Build & Tests](https://github.com/khulnasoft/IntelX/workflows/Build%20&%20Tests/badge.svg)](https://github.com/khulnasoft/IntelX/actions)
[![DeepSource](https://app.deepsource.com/gh/khulnasoft/IntelX.svg/?label=resolved+issues&token=BSvKHrnk875Y0Bykb79GNo8w)](https://app.deepsource.com/gh/khulnasoft/IntelX/?ref=repository-badge)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/khulnasoft/IntelX/badge)](https://api.securityscorecards.dev/projects/github.com/khulnasoft/IntelX)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/7120/badge)](https://bestpractices.coreinfrastructure.org/projects/7120)

Do you want to get **threat intelligence data** about a malware, an IP address or a domain? Do you want to get this kind of data from multiple sources at the same time using **a single API request**?

You are in the right place!

IntelX is an Open Source solution for management of Threat Intelligence at scale. It integrates a number of analyzers available online and a lot of cutting-edge malware analysis tools.

### Features
This application is built to **scale out** and to **speed up the retrieval of threat info**.

It provides:
- **Enrichment of Threat Intel** for files as well as observables (IP, Domain, URL, hash, etc).
- A Fully-fledged REST APIs written in Django and Python.
- An easy way to be integrated in your stack of security tools to automate common jobs usually performed, for instance, by SOC analysts manually. (Thanks to the official libraries [intelpy](https://github.com/khulnasoft/intelpy) and [go-intelx](https://github.com/khulnasoft/go-intelx))
- A **built-in GUI**: provides features such as dashboard, visualizations of analysis data, easy to use forms for requesting new analysis, etc.
- A **framework** composed of modular components called **Plugins**:
  - *analyzers* that can be run to either retrieve data from external sources (like VirusTotal or AbuseIPDB) or to generate intel from internally available tools (like Yara or Oletools)
  - *connectors* that can be run to export data to external platforms (like MISP or OpenCTI)
  - *pivots* that are designed to trigger the execution of a chain of analysis and connect them to each other
  - *visualizers* that are designed to create custom visualizations of analyzers results
  - *ingestors* that allows to automatically ingest stream of observables or files to IntelX itself
  - *playbooks* that are meant to make analysis easily repeatable


### Documentation [![Documentation Status](https://readthedocs.org/projects/intelx/badge/?version=latest)](https://intelx.readthedocs.io/en/latest/?badge=latest)
We try hard to keep our documentation well written, easy to understand and always updated.
All info about installation, usage, configuration and contribution can be found [here](https://intelx.readthedocs.io/)

### Publications and Media

To know more about the project and its growth over time, you may be interested in reading [the official blog posts and/or videos about the project by clicking on this link](https://intelx.readthedocs.io/en/latest/Introduction.html#publications-and-media)

### Available services or analyzers

You can see the full list of all available analyzers in the [documentation](https://intelx.readthedocs.io/en/latest/Usage.html#available-analyzers).

| Type                                               | Analyzers Available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Inbuilt modules                                    | - Static Office Document, RTF, PDF, PE File Analysis and metadata extraction<br/> - Strings Deobfuscation and analysis ([FLOSS](https://github.com/mandiant/flare-floss), [Stringsifter](https://github.com/mandiant/stringsifter), ...)<br/> - PE Emulation with [Qiling](https://github.com/qilingframework/qiling) and [Speakeasy](https://github.com/mandiant/speakeasy)<br/> - PE Signature verification<br/> - PE Capabilities Extraction ([CAPA](https://github.com/mandiant/capa))<br/> - Javascript Emulation ([Box-js](https://github.com/CapacitorSet/box-js))<br/> - Android Malware Analysis ([Quark-Engine](https://github.com/quark-engine/quark-engine), ...)<br/> - SPF and DMARC Validator<br/> - Yara (a lot of public rules are available. You can also add your own rules)<br/> - more...                                                                                                                                                                                                                                  |
| External services                                  | - Abuse.ch <a href="https://bazaar.abuse.ch/about/" target="_blank">MalwareBazaar</a>/<a href="https://urlhaus.abuse.ch/" target="_blank">URLhaus</a>/<a href="https://threatfox.abuse.ch/about/" target="_blank">Threatfox</a>/<a href="https://yaraify.abuse.ch/about/" target="_blank">YARAify</a></br> - <a href="https://docs.greynoise.io/docs/3rd-party-integrations" target="_blank"> GreyNoise v2</a><br/> - <a href="https://analyze.intezer.com/?utm_source=IntelX" target="_blank"> Intezer</a><br/> - VirusTotal v3<br/> - <a href="https://doc.crowdsec.net/docs/next/cti_api/integration_intelx/?utm_source=IntelX" target="_blank"> Crowdsec</a><br/> - <a href="https://urlscan.io/docs/integrations/" target="_blank">URLscan</a><br/> - Shodan<br/> - AlienVault OTX<br/> - <a href="https://intelx.io/integrations" target="_blank">Intelligence_X</a><br/> - <a href="https://www.misp-project.org/" target="_blank">MISP</a><br/> - many more.. |

## Partnerships and sponsors

As open source project maintainers, we strongly rely on external support to get the resources and time to work on keeping the project alive, with a constant release of new features, bug fixes and general improvements.

Because of this, we joined [Open Collective](https://opencollective.com/intelx-project) to obtain non-profit equal level status which allows the organization to receive and manage donations transparently. Please support IntelX and all the community by choosing a plan (BRONZE, SILVER, etc).

<a href="https://opencollective.com/intelx-project/donate" target="_blank">
  <img src="https://opencollective.com/intelx-project/donate/button@2x.png?color=blue" width=200 />
</a>