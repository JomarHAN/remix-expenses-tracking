import { Outlet } from "@remix-run/react";

import expensesStyle from '~/styles/expenses.css'

export const links = () => {
    return [{rel: 'stylesheet', href: expensesStyle}]
}

export default function ExpensesPage() {
    return (
        <main>
            <h1>Share Layout</h1>
            <Outlet/>
        </main>
        )
}
