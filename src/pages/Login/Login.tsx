import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./Login.scss";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./Firebase";

/**
 * ### userDetails
 * An interface representing the shape of the form input for the login page
 *
 * @property {string} email - User's email address.
 * @property {string | null} password - User's password.
 * @property {string | null} fullName - User's full name.
 * @property {string | null} instituteName - Name of the institution the user is affiliated with.
 *
 * - **NOTE:** This is different from the `User` interface in our admin page, because this
 * class doesn't contain sensitive information such as the approval and admin status
 * of the user.
 */
interface userDetails {
  email: string;
  password?: string;
  fullName?: string;
  instituteName?: string;
}

/**
 * ### Login
 * Component representing the login page that users navigate to in order to log into
 * and use the calculators and software provided by the Zhu Web App.
 *
 * ### State and Behavior
 * - `captchaRef`: Reference to the ReCAPTCHA component.
 * - `emailRef`: Reference to the email field input.
 * - `passRef`: Reference to the password input field.
 * - `firstNameRef`: Reference to first name input
 * - `lastNameRef`: Reference to last name input
 * - `institutionRef`: Reference to institution name input
 * - `confirmPassword`: A state holding a tuple of a boolean and a number. The boolean represents whether the password and confirm password fields match,
 *                      and the number represents the length of the password.
 * - `loginRegParam`: A state holding URL search parameters, initialized with an parameter `page` which is an empty string.
 * - `errorMessage`: State that holds an error message.
 * - `registerLoginState`: A boolean state representing whether the user is in the registration. If true, user is trying to register, else logging in.
 * - `showResetPasswordModal`: A boolean state representing whether the reset password modal is shown.
 * - `resetPasswordEmail`: A string state holding the email address for the password reset.
 * - `showTermsModal`: A boolean state representing whether the "terms & conditions" modal is shown.
 * - `termsAgreed`: A boolean state representing whether the user has agreed to the terms & conditions.
 *
 * ### Api Integrations
 *
 * - **Firebase Authentication**
 *  - `createUserWithEmailAndPassword`: Creates a new user account with the specified email and password.
 * - `sendEmailVerification`: Sends an email verification to the user.
 * - `signInWithEmailAndPassword`: Sign in the user with an email and password.
 * - `sendPasswordResetEmail`: Sends a password reset email to the user.
 * - `auth`: Firebase authentication object.
 *
 */
export default function Login() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const institutionRef = useRef<HTMLInputElement | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<[boolean, number]>([
    false,
    0,
  ]);
  const [loginRegParam, setLoginRegParam] = useSearchParams({ page: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerLoginState, setRegisterLoginState] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

  /**
   * When the user switches between login and register:
   * 1. Reset the form fields
   * 2. Set the page parameter in the URL. Again if "RegisterLogin" is
   *    true, we're setting the page to "Register" else "Login". We also have
   *    replace set to true, which means the previous url will not be accessible via the back button.
   *
   * NOTE: Adding setRegisterLoginState means hook will run when the function changes. A state
   * setting function doesn't change, so it won't trigger the hook. As a result, we can add it
   * to satisfy react linting rules.
   */
  useEffect(() => {
    if (emailRef.current) emailRef.current.value = "";
    if (passRef.current) passRef.current.value = "";
    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
    if (institutionRef.current) institutionRef.current.value = "";

    setLoginRegParam(
      (prev) => {
        prev.set("page", registerLoginState ? "Register" : "Login");
        return prev;
      },
      { replace: true }
    );
  }, [registerLoginState]);

  /**
   * Checks if the password is strong enough. A strong password must:
   * - Be at least 8 characters long
   * - Include at least one uppercase letter
   * - Include at least one lowercase letter
   * - Include at least one number
   * - Include at least one special character
   * - Not contain parts of the email address
   *
   * @param password Password being checked
   * @param email Email address to check against the password
   * @returns Boolean indicating whether the password is strong enough
   */
  function isStrongPassword(password: string, email: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    // Check if password contains parts of the email (before '@' and domain)
    const emailParts = email.split(/[@.]/);
    for (const part of emailParts) {
      if (password.toLowerCase().includes(part.toLowerCase())) {
        return false;
      }
    }

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough
    );
  }

  /**
   * Handles login/registration form submission event.
   *
   * All login or registration logic is inside this one function.
   *
   * @param e Form submission event
   */
  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get the value of the ReCAPTCHA component, email, password, institution, and full name fields.
    const captchaValue = captchaRef.current?.getValue();
    const emailValue = emailRef.current?.value;
    const password = passRef.current?.value;
    const institution = institutionRef.current?.value;
    const fullName =
      firstNameRef.current?.value + " " + lastNameRef.current?.value;

    const userDetails: userDetails = { email: "" };
    userDetails.email = emailValue + "";

    /**
     * If the user is registering, check if the password is strong enough and the terms are agreed to.
     *
     * NOTE: The reason we're adding empty strings at the end of the variables is to ensure
     * that they are always strings. This is because the ref values can be null.
     */
    if (registerLoginState) {
      userDetails.fullName = fullName + "";
      userDetails.instituteName = institution + "";
      if (!isStrongPassword(password + "", emailValue + "")) {
        setErrorMessage(
          "Password must be 8+ characters, include an upper and lower case letter, a number, a special character, and not match parts of the email."
        );
        return;
      }
      if (!termsAgreed) {
        setErrorMessage("You must agree to the terms of use to register.");
        return;
      }
    }

    // If the user is registering, then do registration process with Firebase Authentication
    if (registerLoginState) {
      try {
        // 1. Register user in our Firebase app with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue + "",
          password + ""
        );
        const user = userCredential.user;

        // 2. Send email verification to the user
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox.");

        // 3. Send user details to the backend so that the user can be registered on our servers also.
        const response = await fetch(
          "https://js2test.ear180013.projects.jetstream-cloud.org/login_db.php",
          {
            method: "post",
            mode: "cors",
            body: JSON.stringify({
              ...userDetails,
              typeOfOperation: "register",
            }),
          }
        );

        // 4. If the registration was successful, send email notifications to the user and admin. Else render error message.
        if (response.status === 201) {
          sendEmailNotification(userDetails);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } catch (error) {
        // An unexpected error happened; e.g. Network Error
        console.error("Failed to register:", error);
        setErrorMessage("Failed to register. Please try again later.");
      }
    } else {
      /**
       * + **Login Process with Firebase Auth. and PHP Backend:**
       * 1. Attempt to login using firebase. Get the user credentials and move on.
       * - If email is verified in Firebase, send user details to our backend to continue the login process.
       *   - If status 200, the user is good to login , and we can set their email and admin status in localStorage.
       *   - Else, the backend process failed. This likely means that the user's account wasn't approved on our end and
       *     so we're preventing their login.
       * - Else, their email isn't verified in Firebase, so we can't let them login.
       */

      console.log(userDetails);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailValue + "",
          password + ""
        );
        const user = userCredential.user;

        if (user.emailVerified) {
          // Send user details to the backend for login
          const response = await fetch(
            "https://js2test.ear180013.projects.jetstream-cloud.org/login_db.php",
            {
              method: "post",
              mode: "cors",
              body: JSON.stringify({
                ...userDetails,
                password: password + "",
                typeOfOperation: "login",
              }),
            }
          );

          if (response.status === 200) {
            const result = await response.json();
            const { Admin, message, status } = result;

            if (status === "success") {
              localStorage.setItem("email", emailValue + "");
              if (Admin === 1) {
                localStorage.setItem("isAdmin", emailValue + "");
              }
              window.location.href = "/";
            } else {
              setErrorMessage(
                "The user is not approved, contact supcrt@iu.edu"
              );
            }
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          setErrorMessage("Please verify your email before logging in.");
        }
      } catch (error) {
        console.error("Failed to login:", error);
        setErrorMessage("Failed to login. Please try again later.");
      }
    }
  }

  /**
   * Sends email notifications to the user and admin after a user's successful registration.
   * @param userDetails Details of the user who just registered their account.
   */
  function sendEmailNotification(userDetails: userDetails) {
    const templateParams = {
      to_email: userDetails.email,
    };

    emailjs
      .send(
        "service_ccoafdl",
        "template_y3xj2ro",
        templateParams,
        "QSv7U0KuDZu35V1x5"
      )
      .then((response: { status: any; text: any }) => {
        console.log("Email successfully sent!", response.status, response.text);
      })
      .catch((err: any) => {
        console.error("Failed to send email. Error:", err);
      });

    // Send email to the admin
    const adminEmailParams = {
      to_email: "zhulabweb@gmail.com",
    };

    emailjs
      .send(
        "service_ccoafdl",
        "template_6fq5eod",
        adminEmailParams,
        "QSv7U0KuDZu35V1x5"
      )
      .then((response: { status: any; text: any }) => {
        console.log(
          "Admin notification email successfully sent!",
          response.status,
          response.text
        );
      })
      .catch((err: any) => {
        console.error("Failed to send admin email. Error:", err);
      });
  }

  /**
   * Uses Firebase Auth to send a password reset email to the user.
   */
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      alert("Password reset email sent. Please check your inbox.");
      setShowResetPasswordModal(false);
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      setErrorMessage(
        "Failed to send password reset email. Please try again later."
      );
    }
  };

  return (
    <div className="d-flex align-items-center flex-column justify-content-center loginPage">
      <Card className="p-5">
        {/* Form for user login or registration. */}
        <Form onSubmit={(e) => loginUser(e)}>
          {/* If user is registering, show them first name and last name input fields */}
          {registerLoginState && (
            <Form.Group className="d-flex flex-row">
              <Form.Control
                ref={firstNameRef}
                name="name"
                type="name"
                placeholder="First Name"
                required
              />
              <Form.Control
                ref={lastNameRef}
                className="ms-2"
                name="name"
                type="name"
                placeholder="Last Name"
                required
              />
            </Form.Group>
          )}

          {/* Input for email, and institution name if you're registering */}
          <Form.Group className="mt-4">
            <Form.Control
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Institutional Email"
              required
            />
            {registerLoginState && (
              <p className="text-danger ms-1" style={{ fontSize: "x-small" }}>
                Do not use your personal email. <br />
                You may only use professional or institutional email
              </p>
            )}
            {registerLoginState && (
              <Form.Control
                ref={institutionRef}
                type="text"
                name="text"
                placeholder="Institution Name"
                required
              />
            )}
          </Form.Group>

          {/* Input for password field, and confirm password will be shown if they're registering */}
          <Form.Group className="mt-3 d-flex flex-row">
            <Form.Control
              ref={passRef}
              name="text"
              type="password"
              placeholder="Password"
              minLength={8}
              required
            />
            {registerLoginState && (
              <Form.Control
                onChange={(e) =>
                  e.target.value === passRef.current?.value
                    ? setConfirmPassword([
                        true,
                        (passRef.current?.value + "").length,
                      ])
                    : setConfirmPassword([
                        false,
                        (passRef.current?.value + "").length,
                      ])
                }
                className="ms-2"
                name="text"
                type="password"
                placeholder="Confirm Password"
                minLength={8}
                required
              />
            )}
          </Form.Group>

          {/* Render message about passwords not matching when we're registering a new user */}
          {registerLoginState &&
            !confirmPassword[0] &&
            (passRef.current?.value + "").length > 1 && (
              <p className="text-danger ms-1" style={{ fontSize: "x-small" }}>
                Passwords do not match!
              </p>
            )}

          {/* Render terms of use */}
          {registerLoginState && (
            <Form.Group className="mt-3">
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    I agree to the{" "}
                    <span
                      className="text-primary cursor-pointer"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Terms of Use
                    </span>
                  </span>
                }
                required
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </Form.Group>
          )}

          {/* Render an error message on if available */}
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

          {/* 
          Button for registering or logging in (again depends on user's state) 
          
          NOTE: Button is disabled when the user is registering and their password fields don't match.
          */}
          <Button
            type="submit"
            className="mt-4 w-100"
            style={{ backgroundColor: "#990000" }}
            disabled={!confirmPassword[0] && registerLoginState}
          >
            {registerLoginState ? "Register" : "Login"}
          </Button>

          {/*
           Render the "Forgot password button" when the user is trying to log in
           
           NOTE: This makes sense because if the user is trying to log in, we assume they already have 
           an account. They already have a password, so they can choose to reset it if necessary.
          */}
          {!registerLoginState && (
            <p
              className="mt-3 text-primary cursor-pointer"
              role="button"
              onClick={() => setShowResetPasswordModal(true)}
            >
              Forgot Password?
            </p>
          )}

          {/* 
          - If logging in, render "Not a member" (registration link) to go to registration page
          - Else, render "Already a member" (login link) to go to login page.
          The button will toggle the user's registerLoginState.
          */}
          <p className="mt-4 justify-content-center d-flex flex-row text-secondary">
            {!registerLoginState ? "Not" : "Already"} a member?{" "}
            <p
              role="button"
              className="text-primary ms-2 cursor-pointer text-decoration-none"
              onClick={() => setRegisterLoginState(!registerLoginState)}
            >
              {!registerLoginState ? "Register" : "Login"}
            </p>
          </p>
        </Form>
      </Card>

      {/* Password reset modal */}
      <Modal
        show={showResetPasswordModal}
        onHide={() => setShowResetPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={resetPasswordEmail}
              onChange={(e) => setResetPasswordEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowResetPasswordModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Send Reset Email
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Terms and conditions modal */}
      <Modal
        show={showTermsModal}
        onHide={() => setShowTermsModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms of Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Use Provisions for the Geochemical Modeling Portal</p>
          <p>
            The User agrees to the following conditions regarding the
            geochemical modeling portal (collectively referred to as "Portal")
            provided by Indiana University:
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
                Portal to develop or provide commercial products or services.
                Any commercial inquiries about the Portal, including those
                related to potential licensing arrangements, should be directed
                to supcrt@iu.edu.
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
            solubility calculator”, “CH4 solubility calculator”, “Rate
            Calculator” Copyright (c) 2024, The Trustees of the Indiana
            University. All rights reserved.
          </p>
          <p>
            This software is provided by the copyright holders and contributors
            "as is" and any express or implied warranties, including, but not
            limited to, the implied warranties of merchantability and fitness
            for a particular purpose are disclaimed. in no event shall the
            copyright owner or contributors be liable for any direct, indirect,
            incidental, special, exemplary, or consequential damages (including,
            but not limited to, procurement of substitute goods or services;
            loss of use, data, or profits; or business interruption) however
            caused and on any theory of liability, whether in contract, strict
            liability, or tort (including negligence or otherwise) arising in
            any way out of the use of this software, even if advised of the
            possibility of such damage.
          </p>
          <p>
            Additionally, Indiana University is not responsible for storing any
            data that the User has entered or saving any output from the
            modeling results.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
