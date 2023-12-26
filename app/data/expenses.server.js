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

export const getExpenseById = async (id) => {
    try {
        const expense = await prisma.expense.findFirst({ where: { id: `${id}` } })
        return expense
    } catch (error) {
        console.log(error)
        throw error
    }
}