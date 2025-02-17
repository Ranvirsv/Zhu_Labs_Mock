import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "./Firebase";
import { Form, Button } from "react-bootstrap";
import { ROUTES } from "../../constants/routes";

/**
 * ### ForgotPasswordForm
 * Component that represents a form used to send a user a password reset email.
 *
 * ### State and Behavior
 * - email: String state representing the email the user wants to send the "password reset" email to.
 * - isLoading: Boolean state representing when the form is loading/submitting
 * - error: String state that's here to show any errors.s
 * @returns
 */
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Function that runs when the form submits.
   * @param e Form event.
   */
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
      setError(null);
    } catch (error) {
      setError("Failed to send password reset email. Please try again later.");
    }
    setIsLoading(false);
    alert(`Success: Recovery email sent to '${email}'`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Form
      onSubmit={handleResetPassword}
      className="d-flex flex-column row-gap-3">
      <header className="text-center">
        <h2>Forgot Password</h2>
      </header>

      <Form.Group>
        <Form.Control
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </Form.Group>

      {error && <p>{error}</p>}

      <Button type="submit" variant="primary" disabled={isLoading}>
        Send Reset Email
      </Button>

      <hr className="hr" />
      <div className="text-center">
        <p>
          Already have an account? <a href={ROUTES.LOGIN}>Login</a>
        </p>
      </div>
    </Form>
  );
}
