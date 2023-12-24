import authStyle from '~/styles/auth.css'

export const links = () => {
    return [{rel: 'stylesheet', href: authStyle}]
}

export default function AuthPage() {
    return <h1>Auth Page</h1>
}
