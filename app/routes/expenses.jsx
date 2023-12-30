import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { requireUserSession } from "~/data/auth.server";

import expensesStyle from "~/styles/expenses.css";

export default function ExpensesPage() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const action = async ({ request }) => {
  return requireUserSession(request);
};

export const links = () => {
  return [{ rel: "stylesheet", href: expensesStyle }];
};

export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": "max-age=3600",
  };
}
