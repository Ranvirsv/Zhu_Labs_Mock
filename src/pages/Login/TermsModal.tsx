import { Modal, Button } from "react-bootstrap";

interface TermsModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * ### TermsModal
 * Terms and conditions modal that we make all users read when they're registering
 * an account on our site.
 *
 * ### Parameters/Props
 * - showModal: Whether this modal is being shown/visible.
 * - setShowModal: Function that controls whether this modal is shown. We'll need it in this component
 * to close the modal.
 */
export default function TermsModal({
  showModal,
  setShowModal,
}: TermsModalProps) {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Terms of Use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Use Provisions for the Geochemical Modeling Portal</p>
        <p>
          The User agrees to the following conditions regarding the geochemical
          modeling portal (collectively referred to as "Portal") provided by
          Indiana University:
        </p>
        <ol>
          <li>
            Scientific Research Use Only:
            <ul>
              <li>
                The Portal will be used solely for not-for-profit scientific
                research and/or teaching purposes.
              </li>
            </ul>
          </li>
          <li>
            Non-Commercial Use:
            <p>
              The Portal will not be used for any purpose that is intended to
              generate revenue or financial gain for the user or user’s
              organization. This includes, but is not limited to, using the
              Portal to develop or provide commercial products or services. Any
              commercial inquiries about the Portal, including those related to
              potential licensing arrangements, should be directed to
              supcrt@iu.edu.
            </p>
          </li>
        </ol>
        <p>Acceptance of Terms</p>
        <p>
          By using this Portal, the User agrees to comply with the terms and
          conditions set forth in this License Agreement below.
        </p>
        <p>*** License Agreement ***</p>
        <p>
          “SUPCRTBL”, “PHREEQC High P-T”, “CO2 solubility calculator”, “H2S
          solubility calculator”, “CH4 solubility calculator”, “Rate Calculator”
          Copyright (c) 2024, The Trustees of the Indiana University. All rights
          reserved.
        </p>
        <p>
          This software is provided by the copyright holders and contributors
          "as is" and any express or implied warranties, including, but not
          limited to, the implied warranties of merchantability and fitness for
          a particular purpose are disclaimed. in no event shall the copyright
          owner or contributors be liable for any direct, indirect, incidental,
          special, exemplary, or consequential damages (including, but not
          limited to, procurement of substitute goods or services; loss of use,
          data, or profits; or business interruption) however caused and on any
          theory of liability, whether in contract, strict liability, or tort
          (including negligence or otherwise) arising in any way out of the use
          of this software, even if advised of the possibility of such damage.
        </p>
        <p>
          Additionally, Indiana University is not responsible for storing any
          data that the User has entered or saving any output from the modeling
          results.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
