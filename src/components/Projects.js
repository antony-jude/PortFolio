import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Advanced Network Security Scanner",
      description: "Production Python tool with concurrent scanning (20-30 ports/sec), 20+ service detection, CVE integration, JSON/CSV export, risk-based classification. Features TCP banner grabbing, reverse DNS, multiple scan profiles & professional CLI with argparse.",
      imgUrl: projImg1,
      github: "https://github.com/antony-jude/network-scanner",
    },
    {
      title: "ShadowRecon - Advanced OSINT Framework",
      description: "Professional-grade Open Source Intelligence framework for ethical cybersecurity research. Features async username reconnaissance across 10+ platforms, comprehensive domain reconnaissance with WHOIS lookups, DNS resolution, SSL certificate extraction, IP intelligence.",
      imgUrl: projImg2,
    },
    {
      title: "Rail Tracer - IoT Tracking System",
      description: "End-to-end railway component traceability solution featuring AI-driven laser marking for QR codes, mobile/web software platform with real-time tracking, vendor data management, and hybrid batch + individual component tracking.",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInUp": ""}>
                <h2>Projects</h2>
                <p>Collection of security-focused projects demonstrating hands-on experience with vulnerability assessment, secure coding practices, and cybersecurity tools. Each project reflects my commitment to building and analyzing secure systems.</p>
                <Row>
                  {
                    projects.map((project, index) => {
                      return (
                        <ProjectCard
                          key={index}
                          {...project}
                          />
                      )
                    })
                  }
                </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  )
}
