import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

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

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_DATA} />
      <ExpenseStatistics expenses={DUMMY_DATA} />
    </main>
  );
}
