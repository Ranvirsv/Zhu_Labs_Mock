import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "./Firebase";
import { useNavigate } from "react-router";

/**
 * ### LoginForm
 * Component representing the user login form.
 *
 *
 * ### State and Behavior
 * - formData: Object state that contains the form data.
 * - isLoading: Boolean state that indicates if the form is loading (submitting).
 * - errorMessage: String state that will render any error messages.
 * - navigate: React router dom hook that we'll use to redirect the user after successful login.
 */
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const navigate = useNavigate();

  // Changes text input changes and updates the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles user login logic
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // If account not verified, then early return (first verification step)
      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in!");
        return;
      }

      // Attempt to login on our php servers (second verification step)
      const response = await fetch(
        "https://js2test.ear180013.projects.jetstream-cloud.org/login_db.php",
        {
          method: "post",
          mode: "cors",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            typeOfOperation: "login",
          }),
        }
      );

      // If logging in failed due to some unexpected reason (e.g. network error, 404 not found)
      if (response.status !== 200) {
        setErrorMessage("An error occurred. Please try again!");
        return;
      }

      // At this point the request was made successfully
      // NOTE: The reason message isn't used is because we haven't setup a good backend yet
      // We'll need to take steps seeing what the firebase would give back. And then updating the backend to be more maintainable.
      const result = await response.json();
      const { Admin, message, status } = result; // NOTE: Extract JSON, "Admin" is either 0 or 1.

      // User hasn't been verified/approved by Zhu Labs, so we can't log them in.
      if (status !== "success") {
        setErrorMessage("This user is not approved, contact supcrt@iu.edu!");
        return;
      }

      localStorage.setItem("email", formData.email);
      if (Admin === 1) {
        // NOTE: Right now, if isAdmin: <user's email>, then they're an admin. So if it's undefined in localStorage, then
        // they're not an admin.
        localStorage.setItem("isAdmin", formData.email);
      }

      // Redirect to the home page
      // NOTE: Since LoginForm is unmounted, we don't need to clear the error message as that's cleared when component unmounts.
      navigate("/");
    } catch (error) {
      console.error("Failed to login: ", error);
      setErrorMessage("Failed to login. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    // Should probably the form be a flexbox so that all rows are evenly spaced
    <Form onSubmit={loginUser} className="d-flex flex-column row-gap-3">
      <header className="form-header text-center">
        <h2>Login</h2>
      </header>

      {/* Form fields */}
      <Form.Group className="d-flex flex-column row-gap-3">
        <Form.Control
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Institutional Email"
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
      </Form.Group>

      {/* Error message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Login button */}
      <Button type="submit" disabled={isLoading}>
        Login
      </Button>

      <hr className="hr" />

      {/* Links to other pages */}
      <div>
        <p>
          Don't have an account? <a href="/Auth/Register">Register here</a>
        </p>
        <a href="/Auth/ForgotPassword">Forgot your password? </a>
      </div>
    </Form>
  );
}
