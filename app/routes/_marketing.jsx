import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserSession } from "~/data/auth.server";

import marketingStyle from "~/styles/marketing.css";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const links = () => {
  return [{ rel: "stylesheet", href: marketingStyle }];
};

export const loader = async ({ request }) => {
  const userId = await getUserSession(request);

  return userId;
};
