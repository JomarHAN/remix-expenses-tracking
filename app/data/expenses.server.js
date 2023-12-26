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