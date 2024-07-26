# Introduction

ThreatMatrix was designed with the intent to help the community, in particular those researchers that can not afford commercial solutions, in the generation of threat intelligence data, in a simple, scalable and reliable way.

Main features:

- Provides enrichment of Threat Intel for malware as well as observables (IP, Domain, URL, hash, etc).
- This application is built to **scale out** and to **speed up the retrieval of threat info**.
- Thanks to the official libraries [pythreatmatrix](https://github.com/khulnasoft/pythreatmatrix) and [go-threatmatrix](https://github.com/khulnasoft/go-threatmatrix), it can be integrated easily in your stack of security tools to automate common jobs usually performed, for instance, by SOC analysts manually.
- Threat Matrix is composed of:
  - **analyzers** that can be run to either retrieve data from external sources (like VirusTotal or AbuseIPDB) or to generate intel from internally available tools (like Yara or Oletools)
  - **connectors** that can be run to export data to external platforms (like MISP or OpenCTI)
  - **visualizers** that can be run to create custom visualizations of analyzers results
  - **playbooks** that are meant to make analysis easily repeatable
- API REST written in Django and Python 3.9.
- Built-in frontend client written in ReactJS, with **[certego-ui](https://github.com/certego/certego-ui)**: provides features such as dashboard, visualizations of analysis data, easy to use forms for requesting new analysis, etc.

## Publications and media
To know more about the project and its growth over time, you may be interested in reading the following official blog posts and/or videos:

- [The Honeynet Workshop: Denmark 2024](https://github.com/khulnasoft/thp_workshop_2024)
- [Certego Blog: v6 Announcement (in Italian)](https://www.certego.net/blog/threatmatrix-six-release/)
- [HackinBo 2023 Presentation (in Italian)](https://www.youtube.com/watch?v=55GKEZoDBgU)
- [Certego Blog: v.5.0.0 Announcement](https://www.certego.net/blog/threatmatrix-v5-released)
- [Youtube demo: ThreatMatrix v4](https://youtu.be/pHnh3qTzSeM)
- [Certego Blog: v.4.0.0 Announcement](https://www.certego.net/en/news/threat-matrix-release-v4-0-0/)
- [Honeynet Blog: v3.0.0 Announcement](https://www.honeynet.org/2021/09/13/threat-matrix-release-v3-0-0/)
- [Threat Matrix on Daily Swig](https://portswigger.net/daily-swig/threat-matrix-osint-tool-automates-the-intel-gathering-process-using-a-single-api)
- [Honeynet Blog: v1.0.0 Announcement](https://www.honeynet.org/?p=7558)
- [Certego Blog: First announcement](https://www.certego.net/en/news/new-year-new-tool-threat-matrix/)

Feel free to ask everything it comes to your mind about the project to the author:
KhulnaSoft DevSec  ([Twitter](https://twitter.com/khulnasoft)).

We also have a dedicated twitter account for the project: [@threat_matrix](https://twitter.com/threat_matrix).