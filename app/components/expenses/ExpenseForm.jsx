import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const errorAction = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state != "idle";

  const loaderData = useLoaderData();

  let defaultValue = {};
  defaultValue = loaderData
    ? {
        title: loaderData.title,
        amount: loaderData.amount,
        date: loaderData.date.slice(0, 10),
      }
    : { title: "", amount: "", date: "" };

  return (
    <Form
      method={loaderData ? "PATCH" : "POST"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValue.date}
          />
        </p>
      </div>
      {errorAction && (
        <ul>
          {Object.values(errorAction).map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to={".."}>Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
