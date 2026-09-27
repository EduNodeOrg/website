import React, { Component } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../NavBar";
import "./style.css";
import scf from "./scfwinner.png";
import u from "./users.png";
import ws from "./workshop.png";

const MILESTONES = [
  { date: "March 2020", title: "EduNode was released" },
  { date: "October 2020", title: "Winners of the Stellar Community Fund #6" },
  {
    date: "October 2020",
    title: "Finalist of the Educational Content challenge - Kelp StellarBattle",
  },
  { date: "February 2021", title: "Released first EduNode Stellar course" },
  {
    date: "July 2021",
    title: "2K+ of users have used our platform and learned something new during the last year",
  },
  {
    date: "September 2021",
    title: "People from over 100 countries have already engaged with us",
    image: u,
    imageAlt: "EduNode users worldwide",
  },
  {
    date: "October 2021",
    title: "More than 500 passionate people about EduNode follow us on social media",
  },
  {
    date: "Q3 2021",
    title:
      "Partnership with WIFI — with more than 3,000 courses, seminars, and training courses, WIFI Vienna is the largest provider of vocational training and further education",
  },
  { date: "Q4 2022", title: "New Dashboard UI and Customer Support Chat" },
  {
    date: "May 2022",
    title: "Blockchain Workshop sponsored by Talent Garden Austria, Stellar Global, and Litemint",
    image: ws,
    imageAlt: "EduNode blockchain workshop",
  },
  {
    date: "2022",
    title: "Winners of the Stellar Community Fund (SCF) #10",
    image: scf,
    imageAlt: "Stellar Community Fund winner",
    imageLink: "https://communityfund.stellar.org/",
  },
];

class Milestones extends Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Milestones | EduNode</title>
          <link rel="canonical" href="https://edunode.org/milestones" />
          <meta
            name="description"
            content="EduNode's journey: from launch in 2020 to winning the Stellar Community Fund twice, reaching users in 100+ countries, and partnering with WIFI Vienna."
          />
        </Helmet>
        <NavBar />
        <div className="milestones-page">
          <header className="milestones-header">
            <h1>Milestones</h1>
            <p>Key moments in EduNode's journey — from launch to a global learning community.</p>
          </header>
          <div className="timeline">
            {MILESTONES.map((m, i) => (
              <div
                className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
                key={m.title}
              >
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <span className="timeline-date">{m.date}</span>
                  <p className="timeline-title">{m.title}</p>
                  {m.image &&
                    (m.imageLink ? (
                      <a
                        href={m.imageLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={m.image} alt={m.imageAlt} />
                      </a>
                    ) : (
                      <img src={m.image} alt={m.imageAlt} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Milestones;
