import { Link, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesIndex() {
  const expenses = useLoaderData();

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
      <ExpensesList expenses={expenses} />
    </main>
  );
}

export const loader = () => {
  console.log("EXPENSES LOADER");
  return getExpenses();
};
