import { Link } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";

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

export default function ExpensesIndex() {
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
      <ExpensesList expenses={DUMMY_DATA} />
    </main>
  );
}
