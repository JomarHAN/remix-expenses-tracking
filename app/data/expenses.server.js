import { prisma } from "./database.server"

export const addExpenses = async (expensesData, userId) => {
    try {
        return await prisma.expense.create({
            data: {
                title: expensesData.title,
                amount: +expensesData.amount,
                date: new Date(expensesData.date),
                User: { connect: { id: userId } }
            }
        })
    } catch (error) {
        throw new Error("Failed to add the expense!")
    }

}

export const getExpenses = async (userId) => {
    try {
        return await prisma.expense.findMany({ where: { userId }, orderBy: { dateAdded: "desc" } })
    } catch (error) {
        throw new Error("Failed to get the Expenses List!")
    }
}

export const getExpenseById = async (expenseId) => {
    try {
        const expense = await prisma.expense.findFirst({ where: { id: expenseId } })
        return expense
    } catch (error) {
        throw new Error("Failed to get the expense!")
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
        throw new Error("Failed to update the expense!")
    }
}

export const deleteExpense = async (expenseId) => {
    try {
        await prisma.expense.delete({ where: { id: expenseId } })
    } catch (error) {
        throw new Error("Failed to delete the item!")
    }
}