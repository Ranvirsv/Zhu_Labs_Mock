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

interface userDetails {
  email: string;
  password?: string;
  fullName?: string;
  instituteName?: string;
}

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

  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const captchaValue = captchaRef.current?.getValue();
    const emailValue = emailRef.current?.value;
    const password = passRef.current?.value;
    const institution = institutionRef.current?.value;
    const fullName =
      firstNameRef.current?.value + " " + lastNameRef.current?.value;

    const userDetails: userDetails = { email: "" };
    userDetails.email = emailValue + "";

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

    if (registerLoginState) {
      // Registration logic with Firebase Authentication
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue + "",
          password + ""
        );
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox.");

        // Send user details to the backend
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

        if (response.status === 201) {
          // Send email notification for registration
          sendEmailNotification(userDetails);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Failed to register:", error);
        setErrorMessage("Failed to register. Please try again later.");
      }
    } else {
      // Login logic with Firebase Authentication

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
        <Form onSubmit={(e) => loginUser(e)}>
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
          {registerLoginState && !confirmPassword[0] && (passRef.current?.value + "").length > 1 && (
            <p className="text-danger ms-1" style={{ fontSize: "x-small" }}>
              Passwords do not match!
            </p>
          )}

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
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

          <Button
            type="submit"
            className="mt-4 w-100"
            style={{ backgroundColor: "#990000" }}
            disabled={!confirmPassword[0] && registerLoginState}
          >
            {registerLoginState ? "Register" : "Login"}
          </Button>

          {!registerLoginState && (
            <p
              className="mt-3 text-primary cursor-pointer"
              role="button"
              onClick={() => setShowResetPasswordModal(true)}
            >
              Forgot Password?
            </p>
          )}
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
