import AuthForm from '~/components/auth/AuthForm'
import authStyle from '~/styles/auth.css'

export const links = () => {
    return [{rel: 'stylesheet', href: authStyle}]
}

export default function AuthPage() {
    return <AuthForm />
}
