import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { loginUser, signupNewUser } from "~/data/auth.server";
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
      await loginUser(credentials);
      return redirect("/expenses");
    } catch (error) {
      if (error.status === 401) {
        return { credentials: error.message };
      }
    }
  } else {
    try {
      await signupNewUser(credentials);
      return redirect("/expenses");
    } catch (error) {
      if (error.status === 422) {
        return { credentials: error.message };
      }
    }
  }
};
