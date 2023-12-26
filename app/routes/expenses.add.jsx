import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import { redirect, useNavigate } from "@remix-run/react";
import { addExpenses } from "~/data/expenses.server";

export default function ExpensesAddPage() {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..");
  };
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const expensesForm = Object.fromEntries(formData);

  await addExpenses(expensesForm);
  return redirect("/expenses");
}
