import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import iuLogo from "./assets/iu-signature.svg";
import { useNavigate } from "react-router";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer
      role="contentinfo"
      itemScope
      itemType="http://schema.org/CollegeOrUniversity"
      style={{
        backgroundColor: "white",
        padding: "20px 0",
        borderTop: "1px solid #ccc",
      }}
    >
      <Container>
        <div className="justify-content-around d-flex flex-row">
          <img
            onClick={() => navigate("https://www.iu.edu/index.html")}
            src={iuLogo}
            className="col-3"
            alt="Indiana University"
          />

          <div className="text-center d-flex flex-row align-items-center ">
            <span>
              <a
                href="https://accessibility.iu.edu/assistance/index.html"
                id="accessibility-link"
                title="Having trouble accessing this web page content? Please visit this page for assistance."
                className="external"
                style={{ color: "crimson" }}
              >
                Accessibility
              </a>
              {" | "}
              <a href="/Privacy" id="privacy-policy-link" style={{ color: "crimson" }}>
                Privacy Notice
              </a>
              {" | "}
              <a
                href="https://www.iu.edu/copyright/index.html"
                className="external"
                style={{ color: "crimson" }}
              >
                Copyright
              </a>
            </span>
            <span>
              © 2024 The Trustees of{" "}
              <a
                href="https://www.iu.edu/index.html"
                itemProp="url"
                className="external"
                style={{ color: "crimson" }}
              >
                <span itemProp="name">Indiana University</span>
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
