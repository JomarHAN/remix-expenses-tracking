import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpenseById } from "~/data/expenses.server";

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
