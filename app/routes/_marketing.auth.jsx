import AuthForm from "~/components/auth/AuthForm";
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
    //
  } else {
    // signup
  }
  return null;
};
