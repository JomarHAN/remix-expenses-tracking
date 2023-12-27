import { Link, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesIndex() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <main>
      <section id="expenses-actions">
        <Link to={"add"}>
          <FaPlus />
          <span>Add Expense</span>
        </Link>
        <a href="/expenses/raw">
          <FaDownload />
          <span>Download Raw Data</span>
        </a>
      </section>
      {hasExpenses ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <section id="no-expenses">
          <h3>No Existing Expenses Found</h3>
        </section>
      )}
    </main>
  );
}

export const loader = () => {
  return getExpenses();
};
