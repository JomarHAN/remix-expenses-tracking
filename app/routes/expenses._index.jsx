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
      <ExpensesList expenses={DUMMY_DATA} />
    </main>
  );
}
