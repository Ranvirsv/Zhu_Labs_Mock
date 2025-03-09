import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Privacy.scss";
import { ROUTES } from "../../constants/routes";
/**
 * ### PrivacyPage
 *
 * Component that displays the privacy policy for the Zhu Applications website.
 */
const PrivacyPage: React.FC = () => {
  return (
    <Container className="mb-5">
      <Row className="justify-content-center mt-4">
        <Col md={10} lg={8} className="mx-auto">
          <div className="privacy-logo">Zhu Applications</div>
          <a href={ROUTES.HOME} className="privacy-home-link">
            Home
          </a>
          <p>
            <b>PRIVACY NOTICE</b>
          </p>
          <h1 className="privacy-subtitle">Zhu Applications</h1>
          <p className="privacy-effective-date">Effective: 2024-06-20</p>
          <h2 className="privacy-overview">Overview</h2>
          <p className="privacy-content">
            At Indiana University (IU), we are committed to protecting the
            privacy and confidentiality of personal information entrusted to us.
            By accessing and using IU's services, you acknowledge and consent to
            the practices described in our global privacy statement here:{" "}
            <a href="https://privacy.iu.edu/privacy/global.html">
              https://privacy.iu.edu/privacy/global.html
            </a>
            .
          </p>
          <p className="privacy-content">
            For additional information outlining how College of Arts + Sciences
            Earth and Atmospheric Science collects, uses, and safeguards
            personal information obtained specifically through our website (
            <a href="https://js2-gateway.ear180013.projects.jetstream-cloud.org/">
              Zhu Applications
            </a>
            ), please also review the information below.
          </p>
          <p className="privacy-content">
            Continued use of our website indicates consent to the collection,
            use, and disclosure of this information as described in this notice.
          </p>
          <p className="privacy-content">
            Visitors to other IU websites should review the privacy notices for
            the sites they visit, as other units at the university may collect
            and use visitor information in different ways. College of Arts +
            Sciences Earth and Atmospheric Science is not responsible for the
            content of other websites or for the privacy practices of websites
            outside the scope of this notice.
          </p>

          <h2 className="privacy-section-title">Changes</h2>
          <p className="privacy-content">
            Because Internet technologies continue to evolve rapidly, College of
            Arts + Sciences Earth and Atmospheric Science may make appropriate
            changes to this notice in the future. Any such changes will be
            consistent with our commitment to respecting visitor privacy, and
            will be clearly posted in a revised privacy notice.
          </p>

          <h2 className="privacy-section-title">Collection and Use</h2>
          <h3 className="privacy-section-subtitle">
            Passive/Automatic Collection
          </h3>
          <p className="privacy-content">
            When you view pages on our site, the web server automatically
            collects certain technical information from your computer and about
            your connection. This information is outlined in the{" "}
            <a href="https://privacy.iu.edu/privacy/global.html">
              IU Privacy statement
            </a>
            .
          </p>
          <p className="privacy-content">
            In addition to any information outlined in the global statement, our
            server and/or site collects the following:
          </p>
          <ul className="privacy-content">
            <li>Your IP address</li>
            <li>The domain name from which you visit our site</li>
            <li>User-specific information on which pages are visited</li>
            <li>Aggregate information on pages visited</li>
            <li>The date and time of visit</li>
            <li>The duration of visit</li>
          </ul>
          <h3 className="privacy-section-subtitle">
            Active/Manual/Voluntary Collection
          </h3>
          <p className="privacy-content">
            We will not attempt to collect any information from you through the
            use of forms or other types of manual input.
          </p>

          <h3 className="privacy-section-subtitle">Information Usage</h3>
          <p className="privacy-content">This information is:</p>
          <ul className="privacy-content">
            <li>Used for internal review and is then discarded</li>
          </ul>

          <h3 className="privacy-section-subtitle">
            Information Used For Contact
          </h3>
          <p className="privacy-content">
            If you supply us with your postal/mailing address:
          </p>
          <ul className="privacy-content">
            <li>
              You will only receive the information for which you provided us
              your address
            </li>
          </ul>

          <h3 className="privacy-section-subtitle">Information Sharing</h3>
          <p className="privacy-content">
            Except as described in the{" "}
            <a href="https://privacy.iu.edu/privacy/index.html">
              IU Privacy statement
            </a>
            , we will not share any information with any other entities or
            organizations for any reason.
          </p>
          <p className="privacy-content">
            Except as provided in the Disclosure of Information section below,
            we do not attempt to use the technical information discussed in this
            section to identify individual visitors.
          </p>

          <h3 className="privacy-section-subtitle">Children</h3>
          <p className="privacy-content">
            This site is not directed to children under 13 years of age, does
            not sell products or services intended for purchase by children, and
            does not knowingly collect or store any personal information, even
            in aggregate, about children under the age of 13. We encourage
            parents and teachers to be involved in children's Internet
            explorations. It is particularly important for parents to guide
            their children when they are asked to provide personal information
            online.
          </p>

          <h3 className="privacy-section-subtitle">
            Use of Third Party Services
          </h3>
          <p className="privacy-content">
            Our website does not utilize web analytics services beyond what is
            noted in the{" "}
            <a href="https://privacy.iu.edu/privacy/index.html">
              IU Privacy statement
            </a>
            .
          </p>

          <h3 className="privacy-section-subtitle">
            Updating Inaccurate Information
          </h3>
          <p className="privacy-content">
            In some cases, we will grant visitors the ability to update or
            correct inaccuracies in the information that we maintain.
          </p>
          <p className="privacy-content">
            Visitors may correct inaccuracies in:
          </p>
          <ul className="privacy-content">
            <li>Contact information</li>
          </ul>
          <p className="privacy-content">
            Visitors can have this information corrected by:
          </p>
          <ul className="privacy-content">
            <li>Sending us email at the listed address</li>
          </ul>

          <h3 className="privacy-section-subtitle">Security</h3>
          <p className="privacy-content">
            Due to the rapidly evolving nature of information technologies, no
            transmission of information over the Internet can be guaranteed to
            be completely secure. While Indiana University is committed to
            protecting user privacy, IU cannot guarantee the security of any
            information users transmit to university sites, and users do so at
            their own risk.
          </p>
          <ul className="privacy-content">
            <li>
              We have appropriate security measures in place in our physical
              facilities to protect against the loss, misuse, or alteration of
              information that we have collected from you at our site.
            </li>
            <li>
              Once we receive user information, we will use reasonable
              safeguards consistent with prevailing industry standards and
              commensurate with the sensitivity of the data being stored to
              maintain the security of that information on our systems.
            </li>
            <li>
              We will comply with all applicable federal, state, and local laws
              regarding the privacy and security of user information.
            </li>
          </ul>

          <h2 className="privacy-section-title">
            Links to non-university sites
          </h2>
          <p className="privacy-content">
            Indiana University is not responsible for the availability, content,
            or privacy practices of non-university sites. Non-university sites
            are not bound by this site privacy notice policy and may or may not
            have their own privacy policies.
          </p>

          <h2 className="privacy-section-title">Privacy Notice Changes</h2>
          <p className="privacy-content">
            From time to time, we may use visitor information for new,
            unanticipated uses not previously disclosed in our privacy notice.
          </p>
          <p className="privacy-content">
            We will post the policy changes to our Website to notify you of
            these changes and provide you with the ability to opt out of these
            new uses. If you are concerned about how your information is used,
            you should check back at our Website periodically.
          </p>
          <p className="privacy-content">
            Visitors may prevent their information from being used for purposes
            other than those for which it was originally collected by:
          </p>
          <ul className="privacy-content">
            <li>Sending us email at the listed address</li>
          </ul>

          {/* <h2 className="privacy-section-title">Contact Information</h2>
          <p className="privacy-content">
            If you have questions or concerns about this policy, please contact us.
          </p>
          <p className="privacy-content">
            College of Arts + Sciences Earth and Atmospheric Sciences<br />
            ATTN: Ruth Droppo<br />
            1001 E. 10th St. Geology 2042<br />
            Bloomington, IN 47405<br />
            rdroppo@indiana.edu<br />
            8128550154
          </p> */}
          <p className="privacy-content">
            If you feel as though this site's privacy practices differ from the
            information stated, you may contact us at the listed address or
            phone number.
          </p>
          <p className="privacy-content">
            If you feel that this site is not following its stated policy and
            communicating with the owner of this site does not resolve the
            matter, or if you have general questions or concerns about privacy
            or information technology policy at Indiana University, please
            contact the chief privacy officer through the University Information
            Policy Office, 812-855-UIPO,{" "}
            <a href="mailto:privacy@iu.edu">privacy@iu.edu</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;
