import { Outlet } from "@remix-run/react";

export default function ExpensesPage() {
    return (
        <main>
            <h1>Share Layout</h1>
            <Outlet/>
        </main>
        )
}
