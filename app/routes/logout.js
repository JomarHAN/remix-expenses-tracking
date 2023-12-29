import { json } from "@remix-run/node"
import { destroyUserSession } from "~/data/auth.server"

export const action = async ({ request }) => {
    if (request.method !== 'POST') {
        throw json({ message: "Invalid request. Please try again later!" }, { status: 400 })
    }

    return destroyUserSession(request)
}