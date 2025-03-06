import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./Firebase";
import TermsModal from "./TermsModal";
import { ROUTES } from "../../constants/routes";

/**
 * ### RegistrationForm
 * Component representing the user registration form.
 *
 * ### State and Behavior
 * - formData: Object state that contains the form data.
 * - isLoading: Boolean state that indicates if the form is loading (submitting).
 * - errorMessage: String state that will render any error messages.
 * - termsAgreed: Boolean state that indicates if the user has agreed to the terms of use.
 * - showTerms: Boolean state that indicates if the terms of use modal should be shown.
 */
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    institutionName: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const navigate = useNavigate();

  // Checks if the password that the user entered is valid; meets strength constraints
  const isValidPassword = (email: string, password: string) => {
    // Combined regex to check for uppercase, lowercase, digit, and special character (min 8 characters)
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return false;
    }

    // Check if password has parts of the email.
    const emailParts = email.split(/[@.]/);
    for (const part of emailParts) {
      if (password.toLowerCase().includes(part.toLowerCase())) {
        return false;
      }
    }

    // At this point, it's a good password
    return true;
  };

  // Handles user registration logic
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password strength
    if (!isValidPassword(formData.email, formData.password)) {
      setErrorMessage(
        "Password must be 8+ characters, include an upper and lower case letter, a number, a special character, and not match parts of the email."
      );
      return;
    }

    // Make sure password fields match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords must match!");
      return;
    }

    if (!termsAgreed) {
      setErrorMessage("You must agree to the terms of use to register.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Send email verification link since we successfully registered to Firebase
      sendEmailVerification(userCredential.user);

      // 2. Register user on the backend
      const response = await fetch(
        "https://js2test.ear180013.projects.jetstream-cloud.org/login_db.php",
        {
          method: "post",
          mode: "cors",
          body: JSON.stringify({
            email: formData.email,
            fullName: formData.fullName,
            institutionName: formData.institutionName,
            typeOfOperation: "register",
          }),
        }
      );

      if (response.status !== 201) {
        setErrorMessage(
          "An error occurred during registration. Please try again later."
        );
        return;
      }

      // Email the user and admin that of the user's signup being successful
      sendEmailNotification();

      // Notify the user that the registration was successful
      alert("Login Success: Verification email sent. Please check your inbox.");

      // Redirect to the login page; no need to clear error message or anything since this component is going to be unmounted
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("User Registration Error: ", error);
      setErrorMessage("User registration failed!");
    }

    setIsLoading(false);
  };

  /**
   * Sends email notifications to the user and admin after a user's successful registration.
   *
   * NOTE: These emails just confirm that to the user that the registration process was successful.
   * @param registeredUserEmail Email of the user that just registered.
   */
  const sendEmailNotification = () => {
    const templateParams = {
      to_email: formData.email,
      to_name: formData.fullName,
    };

    const serviceID = "service_ccoafdl";
    const templateID = "template_y3xj2ro";
    const accessToken = "QSv7U0KuDZu35V1x5";

    emailjs
      .send(serviceID, templateID, templateParams, accessToken)
      .catch((err: any) => {
        console.error("Failed to send email. Error:", err);
      });

    // Send email to the admin
    const adminEmailParams = {
      to_email: "zhulabweb@gmail.com",
      bcc_emails: "lgong@iu.edu",
    };

    emailjs
      .send(serviceID, templateID, adminEmailParams, accessToken)
      .catch((err: any) => {
        console.error("Failed to send admin email. Error:", err);
      });
  };

  // Handle the input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles changes to the checkbox on the terms and conditions modal
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAgreed(e.target.checked);
  };

  return (
    <Form onSubmit={registerUser} className="d-flex flex-column row-gap-3">
      <div className="form-header text-center">
        <h2>Registration</h2>
      </div>

      <Form.Group className="d-flex flex-column row-gap-3">
        <Form.Control
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
        />

        <Form.Group>
          <Form.Control
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Institutional Email"
            required
          />
          <small className="form-text text-muted">
            Only use your professional or institutional email address!
          </small>
        </Form.Group>

        <Form.Control
          value={formData.institutionName}
          onChange={handleChange}
          name="institutionName"
          type="text"
          placeholder="Institutional Name"
          required
        />

        <Form.Control
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <Form.Control
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </Form.Group>

      <Form.Group>
        {/* Check element that toggles user's agreements to terms and also the section to render the terms */}
        <Form.Check
          type="checkbox"
          label={
            <span>
              I agree to the{" "}
              <span
                className="text-primary text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => setShowTerms(true)}
              >
                Terms of Use
              </span>
            </span>
          }
          required
          onChange={handleCheckBoxChange}
        />
      </Form.Group>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        Register
      </Button>

      <hr className="hr" />

      <div className="text-center">
        <p>
          Already have an account? <a href={ROUTES.LOGIN}>Login</a>
        </p>
      </div>

      {/* Terms of Service Modal */}

      <TermsModal showModal={showTerms} setShowModal={setShowTerms} />
    </Form>
  );
}
