import bcrypt from 'bcrypt'
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;


const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: SESSION_SECRET,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true
    }
})

export async function createUserSession(userId, redirectPath) {
    const session = await sessionStorage.getSession();
    session.set('userId', userId);

    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}


export async function getUserSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('cookie'))
    const userId = session.get('userId')

    if (!userId) {
        return null
    }

    return userId
}

export async function requireUserSession(request) {
    const userId = await getUserSession(request)

    if (!userId) {
        throw redirect('/auth?mode=login')
    }

    return userId
}


export async function destroyUserSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('cookie'))
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session)
        }
    })
}

export async function signupNewUser(credentials) {

    const emailExisting = prisma.user.findFirst({ where: { email: credentials.email } })

    if (emailExisting.email) {
        const error = new Error("Email is taken. Please use other emails!")
        error.status = 422;
        throw error;
    }

    const passwordHashed = await bcrypt.hash(credentials.password, 12)

    const user = await prisma.user.create({ data: { email: credentials.email, password: passwordHashed } })

    return user;
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

    return emailExisting;
}

