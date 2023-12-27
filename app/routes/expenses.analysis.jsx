import { Link, json, useLoaderData, useRouteError } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Error from "~/components/util/Error";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export const loader = async () => {
  const expenses = await getExpenses();

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "No Existing Expenses Found!" },
      { status: 404, statusText: "No Expenses" }
    );
  }
  return expenses;
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  if (error) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>{error.data?.message}</p>
          <Link to={"/expenses/add"}>Add a new Expense</Link>
        </Error>
      </main>
    );
  }
};
