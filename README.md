# Threat Matrix

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/khulnasoft/ThreatMatrix)](https://github.com/khulnasoft/ThreatMatrix/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/khulnasoft/ThreatMatrix?style=social)](https://github.com/khulnasoft/ThreatMatrix/stargazers)
[![Docker](https://img.shields.io/docker/pulls/khulnasoft/threatmatrix)](https://hub.docker.com/repository/docker/khulnasoft/threatmatrix)
[![Twitter Follow](https://img.shields.io/twitter/follow/threat_matrix?style=social)](https://twitter.com/threat_matrix)
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/threatmatrix/)
[![Official Site](https://img.shields.io/badge/official-site-blue)](https://khulnasoft.github.io)
[![Live Instance](https://img.shields.io/badge/live-demo-blue)](https://threatmatrix.honeynet.org)

[![CodeFactor](https://www.codefactor.io/repository/github/khulnasoft/threatmatrix/badge)](https://www.codefactor.io/repository/github/khulnasoft/threatmatrix)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Imports: isort](https://img.shields.io/badge/%20imports-isort-%231674b1?style=flat&labelColor=ef8336)](https://pycqa.github.io/isort/)
[![CodeQL](https://github.com/khulnasoft/ThreatMatrix/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/khulnasoft/ThreatMatrix/actions/workflows/codeql-analysis.yml)
[![Dependency Review](https://github.com/khulnasoft/ThreatMatrix/actions/workflows/dependency_review.yml/badge.svg)](https://github.com/khulnasoft/ThreatMatrix/actions/workflows/dependency_review.yml)
[![Build & Tests](https://github.com/khulnasoft/ThreatMatrix/workflows/Build%20&%20Tests/badge.svg)](https://github.com/khulnasoft/ThreatMatrix/actions)
[![DeepSource](https://app.deepsource.com/gh/khulnasoft/ThreatMatrix.svg/?label=resolved+issues&token=BSvKHrnk875Y0Bykb79GNo8w)](https://app.deepsource.com/gh/khulnasoft/ThreatMatrix/?ref=repository-badge)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/khulnasoft/ThreatMatrix/badge)](https://api.securityscorecards.dev/projects/github.com/khulnasoft/ThreatMatrix)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/7120/badge)](https://bestpractices.coreinfrastructure.org/projects/7120)
[![Documentation Status](https://readthedocs.org/projects/threatmatrix/badge/?version=latest)](https://threatmatrix.readthedocs.io/en/latest/?badge=latest)

Do you want to get **threat intelligence data** about a malware, an IP address or a domain? Do you want to get this kind of data from multiple sources at the same time using **a single API request**?

You are in the right place!

ThreatMatrix is an Open Source solution for management of Threat Intelligence at scale. It integrates a number of analyzers available online and a lot of cutting-edge malware analysis tools.

### Features

This application is built to **scale out** and to **speed up the retrieval of threat info**.

It provides:

- **Enrichment of Threat Intel** for files as well as observables (IP, Domain, URL, hash, etc).
- A Fully-fledged REST APIs written in Django and Python.
- An easy way to be integrated in your stack of security tools to automate common jobs usually performed, for instance, by SOC analysts manually. (Thanks to the official libraries [pythreatmatrix](https://github.com/khulnasoft/pythreatmatrix) and [go-threatmatrix](https://github.com/khulnasoft/go-threatmatrix))
- A **built-in GUI**: provides features such as dashboard, visualizations of analysis data, easy to use forms for requesting new analysis, etc.
- A **framework** composed of modular components called **Plugins**:
  - _analyzers_ that can be run to either retrieve data from external sources (like VirusTotal or AbuseIPDB) or to generate intel from internally available tools (like Yara or Oletools)
  - _connectors_ that can be run to export data to external platforms (like MISP or OpenCTI)
  - _pivots_ that are designed to trigger the execution of a chain of analysis and connect them to each other
  - _visualizers_ that are designed to create custom visualizations of analyzers results
  - _ingestors_ that allows to automatically ingest stream of observables or files to ThreatMatrix itself
  - _playbooks_ that are meant to make analysis easily repeatable

### Documentation

We try hard to keep our documentation well written, easy to understand and always updated.
All info about installation, usage, configuration and contribution can be found [here](https://threatmatrix.readthedocs.io/)

### Publications and Media

To know more about the project and its growth over time, you may be interested in reading [the official blog posts and/or videos about the project by clicking on this link](https://threatmatrix.readthedocs.io/en/latest/Introduction.html#publications-and-media)

### Available services or analyzers

You can see the full list of all available analyzers in the [documentation](https://threatmatrix.readthedocs.io/en/latest/Usage.html#available-analyzers).

| Type              | Analyzers Available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inbuilt modules   | - Static Office Document, RTF, PDF, PE File Analysis and metadata extraction<br/> - Strings Deobfuscation and analysis ([FLOSS](https://github.com/mandiant/flare-floss), [Stringsifter](https://github.com/mandiant/stringsifter), ...)<br/> - PE Emulation with [Qiling](https://github.com/qilingframework/qiling) and [Speakeasy](https://github.com/mandiant/speakeasy)<br/> - PE Signature verification<br/> - PE Capabilities Extraction ([CAPA](https://github.com/mandiant/capa))<br/> - Javascript Emulation ([Box-js](https://github.com/CapacitorSet/box-js))<br/> - Android Malware Analysis ([Quark-Engine](https://github.com/quark-engine/quark-engine), ...)<br/> - SPF and DMARC Validator<br/> - Yara (a lot of public rules are available. You can also add your own rules)<br/> - more...                                                                                                                                                                          |
| External services | - Abuse.ch <a href="https://bazaar.abuse.ch/about/" target="_blank">MalwareBazaar</a>/<a href="https://urlhaus.abuse.ch/" target="_blank">URLhaus</a>/<a href="https://threatfox.abuse.ch/about/" target="_blank">Threatfox</a>/<a href="https://yaraify.abuse.ch/about/" target="_blank">YARAify</a></br> - <a href="https://docs.greynoise.io/docs/3rd-party-integrations" target="_blank"> GreyNoise v2</a><br/> - <a href="https://analyze.intezer.com/?utm_source=ThreatMatrix" target="_blank"> Intezer</a><br/> - VirusTotal v3<br/> - <a href="https://doc.crowdsec.net/docs/next/cti_api/integration_threatmatrix/?utm_source=ThreatMatrix" target="_blank"> Crowdsec</a><br/> - <a href="https://urlscan.io/docs/integrations/" target="_blank">URLscan</a><br/> - Shodan<br/> - AlienVault OTX<br/> - <a href="https://intelx.io/integrations" target="_blank">Intelligence_X</a><br/> - <a href="https://www.misp-project.org/" target="_blank">MISP</a><br/> - many more.. |

## Partnerships and sponsors

As open source project maintainers, we strongly rely on external support to get the resources and time to work on keeping the project alive, with a constant release of new features, bug fixes and general improvements.

Because of this, we joined [Open Collective](https://opencollective.com/khulnasoft) to obtain non-profit equal level status which allows the organization to receive and manage donations transparently. Please support ThreatMatrix and all the community by choosing a plan (BRONZE, SILVER, etc).

<a href="https://opencollective.com/khulnasoft/donate" target="_blank">
  <img src="https://opencollective.com/khulnasoft/donate/button@2x.png?color=blue" width=200 />
</a>

### 🥇 GOLD

#### Certego

<a href="https://certego.net/?utm_source=threatmatrix"> <img style="margin-right: 2px" width=250 height=71 src="docs/static/Certego.png" alt="Certego Logo"/></a>

[Certego](https://certego.net/?utm_source=threatmatrix) is a MDR (Managed Detection and Response) and Threat Intelligence Provider based in Italy.

ThreatMatrix was born out of Certego's Threat intelligence R&D division and is constantly maintained and updated thanks to them.

#### The Honeynet Project

<a href="https://www.honeynet.org"> <img style="border: 0.2px solid black" width=125 height=125 src="docs/static/honeynet_logo.png" alt="Honeynet.org logo"> </a>

[The Honeynet Project](https://www.honeynet.org) is a non-profit organization working on creating open source cyber security tools and sharing knowledge about cyber threats.

Thanks to Honeynet, we are hosting a public demo of the application [here](https://threatmatrix.honeynet.org). If you are interested, please contact a member of Honeynet to get access to the public service.

#### Google Summer of Code

<a href="https://summerofcode.withgoogle.com/"> <img style="border: 0.2px solid black" width=150 height=89 src="docs/static/gsoc_logo.png" alt="GSoC logo"> </a>

Since its birth this project has been participating in the [Google Summer of Code](https://summerofcode.withgoogle.com/) (GSoC)!

If you are interested in participating in the next Google Summer of Code, check all the info available in the [dedicated repository](https://github.com/khulnasoft/gsoc)!

### 🥈 SILVER

#### ThreatHunter.ai

<a href="https://threathunter.ai?utm_source=threatmatrix"> <img style="border: 0.2px solid black" width=194 height=80 src="docs/static/threathunter_logo.png" alt="ThreatHunter.ai logo"> </a>

[ThreatHunter.ai®](https://threathunter.ai?utm_source=threatmatrix), is a 100% Service-Disabled Veteran-Owned Small Business started in 2007 under the name Milton Security Group. ThreatHunter.ai is the global leader in Dynamic Threat Hunting. Operating a true 24x7x365 Security Operation Center with AI/ML-enhanced human Threat Hunters, ThreatHunter.ai has changed the industry in how threats are found, and mitigated in real time. For over 15 years, our teams of Threat Hunters have stopped hundreds of thousands of threats and assisted organizations in defending against threat actors around the clock.

#### Docker

In 2021 ThreatMatrix joined the official [Docker Open Source Program](https://www.docker.com/blog/expanded-support-for-open-source-software-projects/). This allows ThreatMatrix developers to easily manage Docker images and focus on writing the code. You may find the official ThreatMatrix Docker images [here](https://hub.docker.com/search?q=khulnasoft).

## About the author and maintainers

Feel free to contact the main developers at any time on Twitter:

- [KhulnaSoft DevSec](https://twitter.com/khulnasoft): Author and principal maintainer
- [Nx PKG](https://github.com/nxpkg): Backend Maintainer
- [KhulnaSoft Lab](https://github.com/khulnasoft-lab): Frontend Maintainer
- [KhulnaSoft BOT](https://github.com/khulnasoft-bot): Key Contributor
