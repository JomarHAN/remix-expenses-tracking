import { prisma } from "./database.server"

export const addExpenses = async (expensesData) => {
    try {
        return await prisma.expense.create({
            data: {
                title: expensesData.title,
                amount: +expensesData.amount,
                date: new Date(expensesData.date)
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }

}

export const getExpenses = async () => {
    try {
        return await prisma.expense.findMany({ orderBy: { dateAdded: "desc" } })
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getExpenseById = async (expenseId) => {
    try {
        const expense = await prisma.expense.findFirst({ where: { id: expenseId } })
        return expense
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateExpenseById = async (expenseId, expenseForm) => {
    try {
        await prisma.expense.update({
            where: { id: expenseId },
            data: {
                title: expenseForm.title,
                amount: +expenseForm.amount,
                date: new Date(expenseForm.date)
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}