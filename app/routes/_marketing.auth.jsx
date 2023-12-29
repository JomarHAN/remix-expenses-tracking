import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import {
  createUserSession,
  loginUser,
  signupNewUser,
} from "~/data/auth.server";
import { validationCredentials } from "~/data/validation.server";
import authStyle from "~/styles/auth.css";

export const links = () => {
  return [{ rel: "stylesheet", href: authStyle }];
};

export default function AuthPage() {
  return <AuthForm />;
}

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validationCredentials(credentials);
  } catch (error) {
    return error;
  }

  if (authMode === "login") {
    try {
      const user = await loginUser(credentials);
      return createUserSession(user.id, "/expenses");
    } catch (error) {
      if (error.status === 401) {
        return { credentials: error.message };
      }
    }
  } else {
    try {
      const user = await signupNewUser(credentials);
      return createUserSession(user.id, "/expenses");
    } catch (error) {
      if (error.status === 422) {
        return { credentials: error.message };
      }
    }
  }
};
