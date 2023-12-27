import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";
  const navigation = useNavigation();
  const errorAction = useActionData();

  const isSubmitting = navigation.state !== "idle";
  const submitBtnCaption = authMode === "login" ? "Login" : "Create New User";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Log in with existing user";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {errorAction && (
        <ul>
          {Object.values(errorAction).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : submitBtnCaption}
        </button>
        <Link to={authMode === "login" ? "?mode=signin" : "?mode=login"}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
