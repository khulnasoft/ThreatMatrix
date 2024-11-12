import "./Home.scss";

import React from "react";
import { Container } from "reactstrap";

import { ContentSection } from "@certego/certego-ui";

import { PUBLIC_URL, VERSION } from "../../constants/environment";

// constants
const versionText = VERSION;
const logoBgImg = `url('${PUBLIC_URL}/logo-negative.png')`;
const blogPosts = [
  {
    title: "ThreatMatrix: Release v4.0.0",
    subText: "Certego Blog: v4.0.0 Announcement",
    date: "1st July 2022",
    link: "https://www.certego.net/en/news/threat-matrix-release-v4-0-0/",
  },
  {
    title: "ThreatMatrix: Release v3.0.0",
    subText: "Honeynet Blog: v3.0.0 Announcement",
    date: "13th September 2021",
    link: "https://www.honeynet.org/2021/09/13/threat-matrix-release-v3-0-0/",
  },
  {
    title:
      "Threat Matrix – OSINT tool automates the intel-gathering process using a single API",
    subText: "Daily Swig: Interview with Matteo Lodi and Eshaan Bansal",
    date: "18th August 2020",
    link: "https://portswigger.net/daily-swig/threat-matrix-osint-tool-automates-the-intel-gathering-process-using-a-single-api",
  },
  {
    title: "New year, new tool: Threat Matrix",
    subText: "Certego Blog: First announcement",
    date: "2nd January 2020",
    link: "https://www.certego.net/en/news/new-year-new-tool-threat-matrix/",
  },
];

// Component
export default function Home() {
  console.debug("Home rendered!");

  return (
    <>
      {/* BG Image */}
      <Container fluid id="home__bgImg" style={{ backgroundImage: logoBgImg }}>
        <h2
          id="home__versionText"
          className="text-accent"
          data-glitch={versionText}
        >
          {versionText}
        </h2>
      </Container>
      {/* Content */}
      <Container id="home__content" className="mt-2">
        <ContentSection className="bg-body shadow lead">
          Threat Matrix is an Open Source Intelligence, or OSINT solution to get
          threat intelligence data about a specific file, an IP or a domain from
          a single API at scale. It integrates a number of analyzers available
          online and a lot of cutting-edge malware analysis tools. It is for
          everyone who needs a single point to query for info about a specific
          file or observable.
        </ContentSection>
        <br />
        {/* blogposts */}
        <h5 className="text-gradient">ThreatMatrix News</h5>
        <ContentSection>
          {blogPosts.map(({ title, subText, date, link }) => (
            <ContentSection key={title} className="border-dark bg-body">
              <small className="text-muted float-end">{date}</small>
              <h5 className="text-secondary">{title}</h5>
              <p className="mb-2 text-muted">{subText}</p>
              <a
                className="link-ul-primary"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read
              </a>
            </ContentSection>
          ))}
        </ContentSection>
      </Container>
    </>
  );
}
