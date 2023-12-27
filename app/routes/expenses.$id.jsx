import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpenseById, updateExpenseById } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesUpdatePage() {
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

export const loader = ({ params }) => {
  return getExpenseById(params.id);
};

export const action = async ({ params, request }) => {
  const expenseId = await params.id;
  const formData = await request.formData();
  const expenseUpdateForm = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseUpdateForm);
  } catch (error) {
    return error;
  }
  await updateExpenseById(expenseId, expenseUpdateForm);
  return redirect("/expenses");
};
