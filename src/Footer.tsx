import React from "react";
import { Container } from "react-bootstrap";
import iuLogo from "./assets/iu-signature.svg";

/**
 * ### Footer
 * Component that displays the footer for the Zhu Labs Application.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
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
          {/* Image that links to another page; use alt text on the image to act as a label */}
          <a href="https://www.iu.edu/index.html" className="col-3">
            <img src={iuLogo} alt="Go to Indiana University home" />
          </a>
          <nav className="text-center d-flex flex-row align-items-center ">
            <span>
              <a
                href="https://accessibility.iu.edu/assistance/index.html"
                aria-label="Go to Indiana University accessibility page"
                id="accessibility-link"
                title="Having trouble accessing this web page content? Please visit this page for assistance."
                className="external"
                style={{ color: "crimson" }}
              >
                Accessibility
              </a>
              {" | "}
              <a
                href="/Privacy"
                aria-label="Go to privacy page"
                id="privacy-policy-link"
                style={{ color: "crimson" }}
              >
                Privacy Notice
              </a>
              {" | "}
              <a
                href="https://www.iu.edu/copyright/index.html"
                aria-label="Go to Indiana University copyright page"
                className="external"
                style={{ color: "crimson" }}
              >
                Copyright
              </a>
            </span>
            <span>
              © {currentYear} The Trustees of{" "}
              <a
                href="https://www.iu.edu/index.html"
                aria-label="Go to Indiana University home"
                itemProp="url"
                className="external"
                style={{ color: "crimson" }}
              >
                <span itemProp="name">Indiana University</span>
              </a>
            </span>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
