import { Outlet } from "@remix-run/react";

import marketingStyle from "~/styles/marketing.css";

export default function MarketingLayout() {
  return <Outlet />;
}

export const links = () => {
  return [{ rel: "stylesheet", href: marketingStyle }];
};
