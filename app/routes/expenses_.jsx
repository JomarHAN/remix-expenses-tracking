import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";

import expensesStyle from "~/styles/expenses.css";

export const links = () => {
  return [{ rel: "stylesheet", href: expensesStyle }];
};

const DUMMY_DATA = [
  {
    id: "e1",
    title: "First title",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second title",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesPage() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_DATA} />
      </main>
    </>
  );
}
