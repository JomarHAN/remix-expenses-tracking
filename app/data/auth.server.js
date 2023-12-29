import bcrypt from 'bcrypt'
import { prisma } from "./database.server";



export async function signupNewUser(credentials) {

    const emailExisting = prisma.user.findFirst({ where: { email: credentials.email } })

    if (emailExisting) {
        const error = new Error("Email is taken. Please use other emails!")
        error.status = 422;
        throw error;
    }

    const passwordHashed = await bcrypt.hash(credentials.password, 12)

    await prisma.user.create({ data: { email: credentials.email, password: passwordHashed } })
}

export async function loginUser(credentials) {
    const emailExisting = await prisma.user.findFirst({ where: { email: credentials.email } })

    if (!emailExisting) {
        const error = new Error("Invalided credentials. Please re-check your credentials!")
        error.status = 401;
        throw error;
    }
    const passwordMatched = await bcrypt.compare(credentials.password, emailExisting.password)

    if (!passwordMatched) {
        const error = new Error("Invalided credentials. Please re-check your credentials!")
        error.status = 401;
        throw error;
    }
}

